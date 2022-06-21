/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: process.env.NODE_ENV === "development"
  },
  redirects: async () => [
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'roadrules.co.zw' }],
      destination: 'https://www.roadrules.co.zw/:path*',
      permanent: true
    }
  ]
})
