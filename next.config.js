const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  exportTrailingSlash: true,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
}
