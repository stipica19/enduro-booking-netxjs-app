import { NextResponse } from "next/server";
import { News } from "@/models/News";
import connectDB from "@/lib/connect-db";

export async function POST(req) {
  let url, public_id, title, summary;
  try {
    ({ url, public_id, title, summary } = await req.json());
  } catch {
    return NextResponse.json({ error: "Neispravan JSON." }, { status: 400 });
  }

  if (!url || !public_id) {
    return NextResponse.json(
      { error: "Nedostaje URL ili public_id" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const post = await News.create({ url, public_id, title, summary });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Greška pri spremanju." }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const images = await News.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: "Greška pri dohvatanju." }, { status: 500 });
  }
}
