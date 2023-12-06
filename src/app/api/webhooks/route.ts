import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const res = data;
    return NextResponse.json({ data: res });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
