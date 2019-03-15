const { PREVIEW_PATH } = process.env

module.exports = {
  assetPrefix: PREVIEW_PATH || '',
  env: {
    ASSET_PREFIX: PREVIEW_PATH || ''
  }
}
