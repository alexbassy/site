export default class Polygon {
  constructor ({ vertices, size }) {
    this.vertices = vertices
    this.size = size
  }

  getPoints () {
    const points = []
    const { vertices } = this

    // we will calculate the values as percentages
    const size = 50
    const center = 50

    points.push([
      center + size * Math.cos(0),
      center + size * Math.sin(0)
    ])

    for (let i = 1; i < vertices; ++i) {
      points.push([
        center + size * Math.cos(i * 2 * Math.PI / vertices),
        center + size * Math.sin(i * 2 * Math.PI / vertices)
      ])
    }

    return points
  }

  getPointsAsClipPath () {
    const points = this.getPoints()
    const getPointAsPercentage = p => Math.floor(p) + '%'
    return `polygon(${
      points.map(xy => xy.map(getPointAsPercentage).join(' '))
    })`
  }

  render (node) {
    node.innerHTML = ''
    const elem = document.createElement('div')

    const points = this.getPoints()
    const polygon = `polygon(${
      points.map(xy => `${xy[0]}% ${xy[1]}%`)
    })`
    elem.style.clipPath = polygon
    elem.style.shapeOutside = polygon

    elem.style.width = `${this.size}px`
    elem.style.height = `${this.size}px`
    elem.style.backgroundColor = '#000'

    node.appendChild(elem)
  }
}