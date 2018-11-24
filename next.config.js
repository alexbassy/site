const { PREVIEW_PATH } = process.env

module.exports = {
  assetPrefix: PREVIEW_PATH || '',
  publicRuntimeConfig: {
    assetPrefix: PREVIEW_PATH || '',
  }
}
