const basePath = process.env.PREVIEW_PATH || ''
const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  trailingSlash: true,
  ignoreDuringBuilds: true,
  basePath,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
}
