export default async (request, context) => {
  const beUrl = 'https://cow-expert-plainly.ngrok-free.app/storage/';
  const url = new URL(request.url)
  
  // if(url.searchParams.get('image') !== 'uploads/*'){
  //   return
  // }
  
  const imagePath = url.searchParams.get('image')
  const fullPath = `${beUrl}${imagePath}`
  const res = await fetch(fullPath);

  context.log(request.url)

  if (!res.ok) {
    return new Response('Image not found', { status: 404 });
  }

  // Pass the image response through with correct headers
  const headers = new Headers(res.headers);
  headers.set('Content-Type', 'image/jpeg'); // Ensure this matches the image type

  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: headers,
  });
};
