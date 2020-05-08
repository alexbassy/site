import getConfig from 'next/config'

const assetPrefix = getConfig().publicRuntimeConfig.assetPrefix

export const BACK_ARROW = '←'
export const ASSET_PREFIX = assetPrefix
