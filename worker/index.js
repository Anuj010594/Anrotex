const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || request.method !== "GET" || !acceptsHtml) {
      return response;
    }

    const requestUrl = new URL(request.url);
    const hasFileExtension = requestUrl.pathname.split("/").pop()?.includes(".");

    if (!hasFileExtension && requestUrl.pathname !== "/") {
      const directoryIndexUrl = new URL(
        `${requestUrl.pathname.replace(/\/$/, "")}/index.html`,
        request.url,
      );
      const directoryResponse = await env.ASSETS.fetch(
        new Request(directoryIndexUrl, request),
      );

      if (directoryResponse.status !== 404) {
        return directoryResponse;
      }
    }

    const fallbackUrl = new URL("/404.html", request.url);
    const fallback = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    return new Response(fallback.body, {
      status: 404,
      headers: fallback.headers,
    });
  },
};

export default worker;
