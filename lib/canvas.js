const BACKGROUND = '#000'

class CanvasLib {
  constructor(canvasElem) {
    this.canvas = canvasElem
    this.ctx = this.canvas.getContext('2d')
    this.dotRadius = 1
    this.dotSpacing = 30
    this.setResolution()
    this.setDimensions()
    this.fillBackground()
    this.drawGridDots()
    window.addEventListener('resize', this.handleResize, { passive: true })
  }

  handleResize = () => {
    this.setDimensions()
    this.setResolution()
    this.fillBackground()
    this.drawGridDots({ animate: false })
  }

  setResolution() {
    const dpr = window.devicePixelRatio || 1
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    this.ctx.scale(dpr, dpr)
  }

  setDimensions() {
    this.width = this.canvas.width
    this.height = this.canvas.height
  }

  getDimensions() {
    return {
      width: this.width,
      height: this.height,
    }
  }

  fillBackground() {
    const { width, height } = this.getDimensions()
    this.ctx.fillStyle = BACKGROUND
    this.ctx.fillRect(0, 0, width, height)
  }

  getGridDotCoordinates = () => {
    const step = this.dotSpacing
    const radius = this.dotRadius
    const [width, height] = [window.innerWidth, window.innerHeight]
    const dotsPerRow = Math.ceil(width / step) + Math.ceil(radius / 2) + 1
    const dotsPerColumn = Math.ceil(height / step) + Math.ceil(radius / 2) + 1

    let coordinates = []

    for (let i = 1, len = dotsPerRow * dotsPerColumn; i < len; ++i) {
      const posX = ((i - 1) % dotsPerRow) * step
      const posY = Math.floor(i / dotsPerRow) * step
      coordinates.push([posX, posY])
    }

    return coordinates
  }

  drawGridDots({ animate = true } = {}) {
    const coordinates = this.getGridDotCoordinates()

    const drawDot = ([x, y], radius) => {
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
      this.ctx.fill()
    }

    this.ctx.fillStyle = 'rgba(255, 255, 255, .35)'
    for (let i = 0, len = coordinates.length; i < len; ++i) {
      if (animate) {
        setTimeout(() => drawDot(coordinates[i], this.dotRadius), i * 1)
      } else {
        drawDot(coordinates[i], this.dotRadius)
      }
    }
  }
}

export default CanvasLib
