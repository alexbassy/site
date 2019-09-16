import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled'
import { constrain, getProgress, hasReachedLimit } from './helpers'
import { SMALL_SCREEN } from './constants'
import SliderDial from './SliderDial'

const Container = styled.div`
  width: calc(100% - 4em);
  position: relative;
  margin: 0 auto;
  user-select: none;

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
    width: 200%;
    left: -100%;
    margin: 0 auto;
  }
`

const SliderValue = styled.span`
  position: absolute;
  font-weight: 100;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 90%;
  font-weight: 600;
`

const AnimatedDial = animated(Dial)

const Slider = ({ value, onChange }) => {
  const containerRef = React.useRef()
  const [containerWidth, setContainerWidth] = useState()
  const [x, setX] = useState(value)
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

  useEffect(() => {
    const newX = containerWidth * (value / 100)
    console.log('value changed', value, newX)
    setX(newX)
    setDelta(0)
  }, [value])

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

    onChange(progress)
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
