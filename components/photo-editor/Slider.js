import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled'
import getConfig from 'next/config'
import { constrain, getProgress, hasReachedLimit } from './helpers'
import { SMALL_SCREEN } from './constants'
import SliderDial from './SliderDial'

const ASSET_PREFIX = getConfig().publicRuntimeConfig.assetPrefix

const Container = styled.div`
  width: calc(100% - 4em);
  position: relative;
  margin: 0 auto;

  ::before {
    content: '${props => props.width}';
  }
`

const DialContainer = styled.div`
  height: auto;
  margin: 1em 0;
  overflow: hidden;
  max-width: 100vw;
`

const Dial = styled.div`
  width: 100%;
  height: 30px;
  position: relative;
  cursor: grab;

  :active {
    cursor: grabbing;
  }

  ${SMALL_SCREEN} {
    margin: 0 auto;
  }
`

const SliderValue = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 80%;
  font-weight: 600;
`

const AnimatedDial = animated(Dial)

const Slider = ({ value }) => {
  const containerRef = React.useRef()
  const [containerWidth, setContainerWidth] = useState()
  const [x, setX] = useState(0)
  const [delta, setDelta] = useState(0)
  const position = x + delta

  // listen for resize events to resize the container
  // will later use to work out %pc of drag position
  useEffect(() => {
    const onResize = ev => {
      const container = containerRef.current
      if (container) setContainerWidth(container.offsetWidth)
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onGesture = isDrag => ({ down, delta, last }) => {
    const [dx] = delta
    const progress = getProgress(x + dx, containerWidth)
    const hasReachedBounds = hasReachedLimit(progress)

    // mouse pointer is pressed, or if it’s a mousewheel event
    if ((down || !isDrag) && !hasReachedBounds)
      setDelta(constrain(dx, containerWidth))

    // if last event, update the last known position (aka X)
    if (last) {
      setDelta(0)
      setX(x => constrain(x + dx, containerWidth))
    }
  }

  const bind = useGesture({
    onDrag: onGesture(true),
    onWheel: onGesture(false),
    // onMove: onGesture(true),
  })

  return (
    <Container ref={containerRef}>
      <DialContainer>
        <AnimatedDial
          {...bind()}
          style={{
            transform: `translate3D(${position}px, 0, 0)`,
          }}
        >
          <SliderDial />
        </AnimatedDial>
      </DialContainer>
      <SliderValue>{getProgress(position, containerWidth)}%</SliderValue>
    </Container>
  )
}

Slider.propTypes = {
  value: PropTypes.number,
}

export default Slider