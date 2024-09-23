const fetch = require('node-fetch');

exports.handler = async (event) => {
  const url = decodeURIComponent(event.queryStringParameters.url);
  try {
    const response = await fetch(url);
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
    return {
      statusCode: 404,
      body: `Image not found: ${error.message}`,
    };
  }
};
