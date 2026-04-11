import { NextResponse } from "next/server";
import connectDB from "@/lib/connect-db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Proveri da li korisnik već postoji
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // Kreiraj korisnika
    const user = await User.create({ name, email, password });

    if (user) {
      return NextResponse.json(
        { message: "User created successfully", userId: user._id },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
