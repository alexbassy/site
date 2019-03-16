import { ASSET_PREFIX } from './constants'

export default function getAssetURL(path) {
  return `${ASSET_PREFIX}/static/assets/${path}`
}
