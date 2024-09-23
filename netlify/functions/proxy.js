// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

exports.handler = async function (event) {
  const imageUrl = 'https://cow-expert-plainly.ngrok-free.app' + event.path.replace('/api/proxy', '');
    console.log("Requesting image from:", event.path);
    try {
        const response = await fetch(imageUrl, {
            headers:{
                'ngrok-skip-browser-warning' : true
            }
        });
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
        return {
            statusCode: response.status,
            body: `Error fetching image: ${response.statusText}`,
            };
        }

    const imageBuffer = await response.buffer();

    return {
        statusCode: 200,
        headers: {
            'Content-Type': contentType,
        },
        body: imageBuffer.toString('base64'),
        isBase64Encoded: true,
        };
    } catch (error) {
        return {
        statusCode: 500,
        body: `Server error: ${error.message}`,
        };
    }
}


