import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ASSET_PREFIX = publicRuntimeConfig.assetPrefix
export const HEADER_HEIGHT = 300
export const MINIMISED_HEADER_HEIGHT = 110
export const PAGE_PADDING = 20
export const BACKGROUND_COLOR = '#222222'
