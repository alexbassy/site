const getPointX = (center, size, pointIndex, numVertices) => {
  return center + size * Math.cos((pointIndex * 2 * Math.PI) / numVertices)
}

const getPointY = (center, size, pointIndex, numVertices) => {
  return center + size * Math.sin((pointIndex * 2 * Math.PI) / numVertices)
}

/**
 * Calculate points in the polygon. Values are percentages.
 * @param {number} numVertices
 */
function getPoints(numVertices) {
  const points = []
  const size = 50
  const center = 50

  for (let i = 0; i < numVertices; ++i) {
    points.push([
      getPointX(center, size, i, numVertices),
      getPointY(center, size, i, numVertices),
    ])
  }

  return points
}

const toRoundedPercentageValue = num => Math.floor(num) + '%'

/**
 * Get polygon path points as percentages for css `clip-path` property
 * @param {number} numVertices
 */
export function polygonAsClipPath(numVertices) {
  const points = getPoints(numVertices)
  return `polygon(${points.map(xy =>
    xy.map(toRoundedPercentageValue).join(' ')
  )})`
}
