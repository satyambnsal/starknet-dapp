import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const data = {
    name: 'SillyApe #',
    description: 'a ERC2114 test run for starkpills',
    image:
      'https://arweave.net/3tsgIKE0d0F-56pDXRpm2E7a-_c-IfUJB7wyhwDhr9o/TestPill/pill_012000.png',
    attributes: [
      {
        trait_type: 'Medical Bill',
        value: 3000000000000000,
      },
      {
        trait_type: 'Ingredient',
        value: 'Cartridge',
      },
      {
        trait_type: 'Background',
        value: 'White',
      },
      {
        trait_type: 'Fame',
        value: 0,
      },
      {
        trait_type: 'DeFame',
        value: 0,
      },
    ],
  }
  const id = req.nextUrl.searchParams.get('id')
  const payload = data
  payload.name += ` #${id}`

  return Response.json(payload)
}
