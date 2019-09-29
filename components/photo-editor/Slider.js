import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Motion, spring } from 'react-motion'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled'
import {
  constrain,
  getProgress,
  hasReachedLimit,
  getDeltaFromProgress,
} from './helpers'
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

const Slider = ({ value, onChange, enabled }) => {
  const containerRef = React.useRef()
  const [containerWidth, setContainerWidth] = useState()
  const [x, setX] = useState(value)
  const [delta, setDelta] = useState(0)
  const [isResetting, setIsResetting] = useState(false)
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
    // if value is 0, reset the slider
    // otherwise, get the x translation from the progress
    setIsResetting(true)
    setTimeout(() => {
      setIsResetting(false)
      setDelta(0)
    }, 800)
    setDelta(position)
    setX(value === 0 ? value : getDeltaFromProgress(value, containerWidth))
  }, [value])

  const onGesture = isDrag => ({ down, delta, last }) => {
    if (!enabled) return
    const [dx] = delta
    const constrainedDelta = constrain(x + dx, containerWidth)
    const progress = getProgress(constrainedDelta, containerWidth)
    const hasReachedBounds = hasReachedLimit(progress)

    // mouse pointer is pressed, or if it’s a mousewheel event
    if ((down || !isDrag) && !hasReachedBounds)
      setDelta(constrain(dx, containerWidth))

    // if last event, update the last known position (aka X)
    if (last) {
      setDelta(0)
      setX(x => constrain(x + dx, containerWidth))
      onChange(progress)
    }
  }

  const bind = useGesture({
    onDrag: onGesture(true),
    onWheel: onGesture(false),
  })

  return (
    <Container ref={containerRef}>
      <Motion
        defaultStyle={{ x: delta }}
        style={{ x: isResetting ? spring(x) : x }}
      >
        {value => (
          <>
            <DialContainer>
              <Dial
                {...bind()}
                style={{
                  transform: `translate3D(${
                    isResetting ? value.x : position
                  }px, 0, 0)`,
                }}
              >
                <SliderDial />
              </Dial>
            </DialContainer>
            {enabled && (
              <SliderValue>
                {getProgress(isResetting ? value.x : position, containerWidth)}%
              </SliderValue>
            )}
          </>
        )}
      </Motion>
    </Container>
  )
}

Slider.propTypes = {
  value: PropTypes.number,
}

export default Slider
