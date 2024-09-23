const fetch = require('node-fetch');

exports.handler = async (event) => {
  const url = decodeURIComponent(event.queryStringParameters.url);
  console.log('Fetching image from:', url); // Add this line

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image. Status: ${response.status}`);
    }

    const buffer = await response.buffer();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': response.headers.get('content-type'),
        'ngrok-skip-browser-warning': 'true',
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error('Error fetching image:', error.message); // Log the error
    return {
      statusCode: 404,
      body: `Error fetching image: ${error.message}`,
    };
  }
};
