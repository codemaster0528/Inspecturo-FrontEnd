const setCache = (url, response) => {
  const data = new Response(JSON.stringify(response))

  if ('caches' in window) {
    // Opening given cache and putting our data into it
    caches.open('MyCache').then(cache => {
      cache.put(url, data)
    })
  }
}

export const getCache = async url => {
  try {
    const cacheStorage = await caches.open('MyCache')
    const cachedResponse = await cacheStorage.match(url)
    var data = await cachedResponse.json()

    return data
  } catch (err) {
    return {}
  }
}

export default setCache
