import { NextResponse } from "next/server";
import connectMongo from "@/lib/connect-db";
import Tour from "../../../models/Tour";

// Lista ruta iz DB
export async function GET() {
  await connectMongo();
  const currentDate = new Date();
  const limitDate = new Date("2026-12-12T18:00:00.000Z");

  const tours = await Tour.find({
    checkOut_date: {
      $gte: currentDate, // Ture koje još nisu završene
      $lt: limitDate, // Ture koje završavaju pre krajnjeg datuma
    },
  }).lean();

  const formattedTours = tours.map((tour) => ({
    ...tour,
    checkIn_date: formatDate(tour.checkIn_date),
    checkOut_date: formatDate(tour.checkOut_date),
    createdAt: formatDate(tour.createdAt),
    updatedAt: formatDate(tour.updatedAt),
  }));
  return NextResponse.json(formattedTours);
}

//Formatiranje datuma
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
