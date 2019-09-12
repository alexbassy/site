import { SLIDER_CONTAINER_WIDTH } from './constants'

// constrain `value` from the mid-value of `bounds`
export const constrain = (value, bounds = SLIDER_CONTAINER_WIDTH) =>
  value < 0 ? Math.max(value, bounds / -2) : Math.min(value, bounds / 2)

export const getProgress = (value, bounds = SLIDER_CONTAINER_WIDTH) =>
  Math.floor((value / bounds) * -200)

export const hasReachedLimit = value => value >= 100 || value <= -100
