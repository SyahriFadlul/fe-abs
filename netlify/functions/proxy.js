const fetch = require('node-fetch');

exports.handler = async (event) => {
  const url = decodeURIComponent(event.queryStringParameters.url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'ngrok-skip-browser-warning': 'true',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return {
      statusCode: 404,
      body: `Error fetching image: ${error.message}`,
    };
  }
};
