import React, { useState, useEffect } from 'react'

export default function useViewportSize() {
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const onResize = () =>
      setViewportSize({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [setViewportSize])

  return viewportSize
}
