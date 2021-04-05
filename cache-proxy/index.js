import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const handleRequest = async event => {
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api')) {
    return await apiCall(event)
  }
  // static assets as fallback for all
  return await handleStaticAssets(event)
}

const handleStaticAssets = async event => {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    let pathname = new URL(event.request.url).pathname
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: 'not found',
    })
  }
}

const apiCall = async event => {
  const request = event.request
  const url = new URL(request.url)
  url.hostname = 'synnytyssairaala-haku.herokuapp.com'
  const r = new Request(url, request)
  // Figure out how to use CF cache most bestest way
  //return await fetch(r, { cf: { cacheEverything: true, cacheTtl: 3600 } });
  return await fetch(r)
}
