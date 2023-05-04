export const config = {
  runtime: 'edge',
}

export default async function handler(req) {
  return new Response(
    JSON.stringify({
      hello: 'From the Edge',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}