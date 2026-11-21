import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Relative base + hash routing: the built app works from any folder (GitHub Pages, Cloudflare Pages, a subpath).
  base: './',
  // Dev: the API runs in a separate local Worker (npm run dev:api, port 8787)
  server: { proxy: { '/api': 'http://localhost:8787' } },
  build: {
    rollupOptions: {
      output: {
        // Language content goes to assets/content/, which is cached when used rather than precached (see workbox)
        chunkFileNames: (c) => (c.facadeModuleId?.includes('/src/content/') ? 'assets/content/[name]-[hash].js' : 'assets/[name]-[hash].js'),
      },
    },
  },
  plugins: [
    preact(),
    {
      // Dev only: /__sleep?ms=N answers after N real milliseconds. The headless UI tests (dev/harness.html) wait with it,
      // because Chrome's virtual time skips ahead of IndexedDB but pauses while a request is pending.
      name: 'dev-sleep',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use('/__sleep', (req, res) => {
          const ms = Math.min(10000, Number(new URL(req.url || '', 'http://x').searchParams.get('ms')) || 500);
          setTimeout(() => res.end('ok'), ms);
        });
      },
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Stampify',
        short_name: 'Stampify',
        description: 'Turn study into stamps. A free language learning app with many game modes.',
        theme_color: '#14234b',
        background_color: '#e9f2ec',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // The app shell is precached. Content (11 languages, books) is too big for that: a language's files are cached
        // the first time it is opened, a long text when it is first read, so they work offline from then on.
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        globIgnores: ['**/assets/content/**'],
        navigateFallbackDenylist: [/^\/api\//],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // File names carry a content hash, so a cached file never goes stale
            urlPattern: ({ url }) => url.pathname.includes('/assets/content/'),
            handler: 'CacheFirst',
            options: { cacheName: 'content', expiration: { maxEntries: 2000 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'StaleWhileRevalidate',
            // CJK fonts arrive as many small unicode-range files
            options: { cacheName: 'fonts', expiration: { maxEntries: 300 } },
          },
          {
            // Stroke-order data for Hanzi Writer, fetched per character
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/npm\/hanzi-writer-data.*/,
            handler: 'CacheFirst',
            options: { cacheName: 'hanzi', expiration: { maxEntries: 3000 } },
          },
        ],
      },
    }),
  ],
});
