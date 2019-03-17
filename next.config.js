const { PREVIEW_PATH } = process.env
const assetPrefix = PREVIEW_PATH || ''

module.exports = {
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
}
