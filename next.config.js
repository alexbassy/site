const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  trailingSlash: true,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
}
