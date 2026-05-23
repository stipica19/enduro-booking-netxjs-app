import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import connectDB from "@/lib/connect-db";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id).select("email isAdmin");
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    return NextResponse.json({
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
