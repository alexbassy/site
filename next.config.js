const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  trailingSlash: true,
  exportTrailingSlash: true,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
}
