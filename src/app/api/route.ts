import { NextRequest } from "next/server";

const IMAGE_BASE_URL = "https://create-starknet-app.xyz/img/";

export function GET(req: NextRequest) {
  const data = {
    name: "Dodgeball #",
    description: "DodgeBall for Bloberty, our dear onchain fishes!",
    image: IMAGE_BASE_URL,
    attributes: [
      {
        trait_type: "Material",
        value: "Bronze",
      },
      {
        trait_type: "Size",
        value: "Large",
      },
      {
        trait_type: "Durability",
        value: "High",
      },
    ],
  };
  const id = parseInt(req.nextUrl.searchParams.get("id")!);
  const payload = data;
  payload.name += ` #${id}`;
  if (id < 16) {
    payload.image = `${IMAGE_BASE_URL}${id}.png`;
  } else {
    payload.image = `${IMAGE_BASE_URL}default.png`;
  }
  return Response.json(payload);
}
