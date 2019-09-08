const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
}
