import { NextRequest, NextResponse } from "next/server";
import pinataSDK from "@pinata/sdk";

// console.log("JWT", process.env.PINATA_JWT);
const PINATA_GATEWAY_URL =
  process.env.NEXT_PUBLIC_PINATA_GATEWAY || "https://gateway.pinata.cloud";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export async function POST(req: NextRequest) {
  const res = await pinata.testAuthentication();
  console.log("pinata user", res);

  try {
    const data = await req.json();
    const res = await pinata.pinJSONToIPFS(data);

    return NextResponse.json({ message: res.IpfsHash });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const res = await fetch(`${PINATA_GATEWAY_URL}/${params.hash}`, {
      method: "GET",
    });
    const data = await res.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
