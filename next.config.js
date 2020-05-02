const withMDX = require('@next/mdx')()
const basePath = process.env.PREVIEW_PATH || ''
const assetPrefix = process.env.PREVIEW_PATH || ''

module.exports = withMDX({
  trailingSlash: true,
  basePath,
  assetPrefix,
  publicRuntimeConfig: {
    assetPrefix,
  },
})
