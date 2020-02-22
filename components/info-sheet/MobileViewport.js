import React from 'react'
import { MobileViewportOuter, MobileViewportInner } from './visual-components'

function MobileViewport(props) {
  if (!props.enabled) return props.children

  return (
    <MobileViewportOuter>
      <MobileViewportInner>{props.children}</MobileViewportInner>
    </MobileViewportOuter>
  )
}

export default MobileViewport
