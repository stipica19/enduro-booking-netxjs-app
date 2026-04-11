import { NextResponse } from "next/server";
import connectMongo from "@/lib/connect-db";
import Anmeldung from "../../../models/Anmeldung";
import { Resend } from "resend";
import Tour from "@/models/Tour";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    await connectMongo();

    const anmeldungen = await Anmeldung.find({
      createdAt: { $gte: new Date("2024-01-01") },
    })
      .populate("tour_number")
      .sort({ createdAt: -1 });

    return NextResponse.json(anmeldungen);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Greska pri dohvacanju",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();

    // 1. Pronađi turu po ID-u
    const tour = await Tour.findById(body.tour_number._id);

    if (!tour) {
      return NextResponse.json(
        { message: "Tour nicht gefunden." },
        { status: 404 }
      );
    }

    // 2. Provjeri da li ima dovoljno slobodnih mjesta
    if (tour.tour_space < body.numPeople) {
      return NextResponse.json(
        { message: "Nicht genügend Plätze verfügbar." },
        { status: 400 }
      );
    }
    const neueAnmeldung = new Anmeldung({
      tour_number: body.tour_number._id,
      tour_type: body.tour_type,
      email: body.email,
      name: body.fullName,
      number_person: body.numPeople,
      address: body.address,
      phone: body.phone,
      transport: body.transport,
      message: body.message,
      rentaBike: body.rentaBike,
    });

    await neueAnmeldung.save();

    // 4. Ažuriraj broj dostupnih mjesta u turi
    tour.tour_space -= body.numPeople;
    await tour.save();

    await resend.emails.send({
      from: `${body.fullName} <info@endurodriftbosnien.com>`,
      to: ["endurodriftbosnien@gmail.com"], // Admin email
      subject: `Nova prijava od ${body.fullName}`,
      replyTo: body.email,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          
          <!-- Header -->
          <div style="background-color: #ff5733; padding: 15px; text-align: center; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h2>🏍️ Nova prijava za Enduro Tour Bosnien! 🏁</h2>
          </div>

          <div style="padding: 20px;">
              <p style="font-size: 16px; color: #333;"><strong>📄 Podaci o prijavi:</strong></p>

              <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ime i prezime:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.fullName
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.email
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Broj osoba:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.numPeople
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Tour:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.tour_number.tour_number
                      } (${body.tour_type}) od ${body.tour_number.tour_in} do ${
        body.tour_number.tour_out
      } </td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Adresa:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.address
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.phone || "Nije uneseno"
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Transport:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.transport
                      }</td>
                  </tr>
                  <tr>
                      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Rent a Bike:</strong></td>
                      <td style="padding: 8px; border: 1px solid #ddd;">${
                        body.rentaBike ? "Da" : "Ne"
                      }</td>
                  </tr>
              </table>

              <div style="margin-top: 15px; padding: 10px; background-color: #f8f8f8; border-radius: 5px;">
                  <p><strong>📩 Poruka korisnika:</strong></p>
                  <p style="font-style: italic; color: #555;">${
                    body.message || "Nema dodatne poruke"
                  }</p>
              </div>

              <p style="margin-top: 20px; font-size: 14px; color: #555;">
                  📅 Datum prijave: <strong>${new Date().toLocaleDateString()}</strong>
              </p>
          </div>

          <div style="background-color: #ff5733; text-align: center; padding: 10px; color: white; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="margin: 0;">🚀 Enduro Drift Bosnien Team</p>
          </div>
      </div>
  `,
    });

    // 📩 Slanje emaila korisniku (potvrda prijave)
    await resend.emails.send({
      from: "Enduro Drift Support <info@endurodriftbosnien.com>",
      to: [body.email],
      subject: "Ihre Anmeldung wurde erfolgreich empfangen!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center;">
            <h2 style="color: #333;">Hallo ${body.fullName},</h2>
            <p style="font-size: 16px; color: #555;">
                Vielen Dank für Ihre Anmeldung! Ihre Anfrage wurde erfolgreich empfangen.
            </p>
            
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <p style="margin: 0; font-size: 15px;"><strong>Details Ihrer Anmeldung:</strong></p>
                <p style="font-style: italic; color: #333;">
                    Tour: ${body.tour_number.tour_in} (${body.tour_type})<br>
                    Anzahl Personen: ${body.numPeople}<br>
                    Transport: ${body.transport}<br>
                    Rent a Bike: ${body.rentaBike ? "Ja" : "Nein"}
                </p>
            </div>
            <p style="font-size: 16px; color: #555; margin-top: 20px;">
                Bei Fragen kontaktieren Sie uns unter: 
                <a href="mailto:endurodriftbosnien@gmail.com" style="color: #007bff; text-decoration: none;">endurodriftbosnien@gmail.com</a>
            </p>

            <div style="text-align: center; margin-top: 30px;">
                <a href="https://endurodriftbosnien.com" 
                   style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                   Besuchen Sie unsere Website
                </a>
            </div>

            <p style="text-align: center; font-size: 14px; color: #777; margin-top: 20px;">
                Mit freundlichen Grüßen, <br>
                <strong>Enduro Drift Team</strong>
            </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Anmeldung erfolgreich gespeichert!" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Fehler beim Speichern der Anmeldung." },
      { status: 500 }
    );
  }
}
