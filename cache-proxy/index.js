addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  url.hostname = "synnytyssairaala-haku.herokuapp.com";
  const r = new Request(url, request);
  // Figure out how to use CF cache most bestest way
  //return await fetch(r, { cf: { cacheEverything: true, cacheTtl: 3600 } });
  return await fetch(r);
}
