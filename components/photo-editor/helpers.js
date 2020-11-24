import { SLIDER_CONTAINER_WIDTH } from './constants'

// constrain `value` from the mid-value of `bounds`
export const constrain = (value, bounds = SLIDER_CONTAINER_WIDTH) =>
  value < 0 ? Math.max(value, bounds / -2) : Math.min(value, bounds / 2)

export const getProgress = (value, bounds = SLIDER_CONTAINER_WIDTH) => {
  // multiply by -200 to invert x transform
  // and double due to both axes being used
  return Math.floor((value / bounds) * -200)
}

export const getDeltaFromProgress = (
  value /* percentage */,
  bounds /* container width */
) => {
  if (value === 0) return value

  // marker is shown in middle of slider
  const origin = bounds / 2

  // because it’s an x translation, invert the result
  const multiplier = -1

  return origin * (value / 100) * multiplier
}

export const hasReachedLimit = value => value >= 100 || value <= -100
