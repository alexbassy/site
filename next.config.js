const basePath = process.env.PREVIEW_PATH || ''
const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = {
  trailingSlash: true,
  basePath,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  }
}
