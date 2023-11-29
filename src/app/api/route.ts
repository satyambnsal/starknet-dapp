import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const data = {
    name: "SillyApe #",
    description: "a ERC721 test run for sillyape",
    image:
      "https://arweave.net/3tsgIKE0d0F-56pDXRpm2E7a-_c-IfUJB7wyhwDhr9o/TestPill/pill_012000.png",
    attributes: [],
  };
  const id = req.nextUrl.searchParams.get("id");
  const payload = data;
  payload.name += ` #${id}`;
  return Response.json(payload);
}
