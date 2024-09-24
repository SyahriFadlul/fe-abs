export default async (request, context) => {
    context.log(request.url);
  
    return new Response("Hello, World from the edge!", {
      headers: { "content-type": "text/html" },
    });
  };