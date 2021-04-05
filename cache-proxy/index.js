import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const handleRequest = async event => {
  const routefn = router(event)
  if (routefn) {
    return await routefn(event)
  }
  // static assets as fallback for all
  return await handleStaticAssets(event)
}

const router = event => {
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api')) {
    return apiCall
  } else if (url.pathname === '/e/loc') {
    return location
  }
}

const handleStaticAssets = async event => {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    let pathname = new URL(event.request.url).pathname
    return notFound()
  }
}

const notFound = () => {
  return new Response('not found', {
    status: 404,
    statusText: 'not found',
  })
}

const location = async event => {
  const ip = event.request.headers.get('x-real-ip')
  if (!ip) {
    return notFound()
  }

  const res = await fetch(`https://ipwhois.app/json/${ip}`)

  if (!res.ok) {
    return notFound()
  }

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
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
