const BACKGROUND = '#111111'

class CanvasLib {
  constructor (canvasElem) {
    this.canvas = canvasElem
    this.ctx = this.canvas.getContext('2d')
    this.setResolution()
    this.setDimensions()
    this.fillBackground()
    this.drawGridDots()
  }

  setResolution () {
    const dpr = window.devicePixelRatio || 1
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * dpr
    this.canvas.height = rect.height * dpr
    this.ctx.scale(dpr, dpr)
  }

  setDimensions () {
    this.width = this.canvas.width
    this.height = this.canvas.height
  }

  getDimensions () {
    return {
      width: this.width,
      height: this.height
    }
  }

  fillBackground () {
    const { width, height } = this.getDimensions()
    this.ctx.fillStyle = BACKGROUND
    this.ctx.fillRect(0, 0, width, height)
  }

  drawGridDots () {
    this.ctx.beginPath()
    this.ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    this.ctx.stroke()
  }


}

export default CanvasLib
