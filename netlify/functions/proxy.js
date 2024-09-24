export const handler = async (event) => {
    const url = event.queryStringParameters.image
  
    try {
        const res = await fetch(`https://cow-expert-plainly.ngrok-free.app/storage/${url}`)
        
        if (!res.ok) {
            return {
                statusCode: res.status,
                body: `Error fetching image: ${res.statusText}`,
            }
        }        
        const arrayBuffer = await res.arrayBuffer();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': res.headers.get('Content-Type') || 'image/jpeg', 
                // 'Cache-Control': 'public, max-age=3600', // Optional caching headers
            },
            body: Buffer.from(arrayBuffer).toString('base64'),
            isBase64Encoded: true, // Important to indicate that the response is Base64-encoded
        }
    } catch (error) {
        return {
        statusCode: 500,
        body: `Error: ${error.message}`,
        }
    }
  }