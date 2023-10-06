import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const data = {
    title: 'Silly Ape',
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Silly Ape',
      },
      description: {
        type: 'string',
        description: 'I am a very very silly ape',
      },
      image: {
        type: 'string',
        description: 'https://picsum.photos/200/300',
      },
    },
  }
  const id = req.nextUrl.searchParams.get('id')
  const payload = data
  payload.properties.name.description += ` #${id}`

  return Response.json(payload)
}
