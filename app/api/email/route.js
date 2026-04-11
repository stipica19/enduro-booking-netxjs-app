import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim();
    const { name, email, message, honeypot, recaptchaToken } = await req.json();

    // Honeypot: ako je polje popunjeno, tiho uspjeh (ne šaljemo email)
    if (honeypot) {
      return Response.json({ success: true });
    }

    // reCAPTCHA v3 verifikacija
    const secret =
      process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET;
    if (!secret) {
      console.warn("RECAPTCHA_SECRET_KEY nije postavljen");
    } else {
      if (!recaptchaToken) {
        return Response.json({ error: "reCAPTCHA neuspio." }, { status: 400 });
      }
      const params = new URLSearchParams();
      params.append("secret", secret);
      params.append("response", recaptchaToken);
      if (ip) params.append("remoteip", ip);

      const verifyRes = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        }
      );
      const verifyJson = await verifyRes.json();
      if (
        !verifyJson.success ||
        (typeof verifyJson.score === "number" && verifyJson.score < 0.5)
      ) {
        return Response.json(
          { error: "reCAPTCHA verifikacija nije prošla." },
          { status: 400 }
        );
      }
    }

    const response = await resend.emails.send({
      from: `Enduro Drift Bosnien <info@endurodriftbosnien.com>`,
      to: ["endurodriftbosnien@gmail.com"],
      subject: `Nova poruka preko kontakt forme`,
      replyTo: email,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333; text-align: center;">Nova poruka</h2>
          <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>Pošiljalac:</strong> ${name} &lt;${email}&gt;</p>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 15px;"><strong>Poruka :</strong></p>
              <p style="font-style: italic; color: #333;">"${message}"</p>
          </div>               
      </div>
  `,
    });

    await resend.emails.send({
      from: "Enduro Drift Bosnien Support <info@endurodriftbosnien.com>", // Verifikovani domen
      to: [email],
      subject: "Vielen Dank, dass Sie uns kontaktiert haben!",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    

          <h2 style="color: #333; text-align: center;">Vielen Dank, dass Sie uns kontaktiert haben, ${name}!</h2>
          <p style="font-size: 16px; color: #555;">
              Ihre Nachricht wurde erhalten und unser Team wird sich bald bei Ihnen melden.
          </p>
          
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin-top: 20px;">
              <p style="margin: 0; font-size: 15px;"><strong>Vaša poruka:</strong></p>
              <p style="font-style: italic; color: #333;">"${message}"</p>
          </div>

          <p style="font-size: 16px; color: #555; margin-top: 20px;">
              Wenn Sie weitere Fragen haben, können Sie uns gerne unter kontaktieren 
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
              <strong>Enduro Drift Bosnien Team</strong>
          </p>
      </div>
  `,
    });
    return Response.json({ success: true, data: response });
  } catch {
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
