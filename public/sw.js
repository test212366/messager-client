self.addEventListener('install', e => e.waitUntil(caches.open('s-app-v1').then(cache => cache.addAll(['index.html']))))
self.addEventListener('fetch', e => e.respondWith(cacheFirst(e.request)))

async function cacheFirst(request) {
	const cached = await caches.match(request)
	return cached ?? fetch(request)
}