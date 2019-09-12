import React, { useState, useCallback } from 'react'
import { animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled'
import { constrain, getProgress, hasReachedLimit } from './helpers'
import { SLIDER_CONTAINER_WIDTH } from './constants'

const Container = styled.div`
  width: ${SLIDER_CONTAINER_WIDTH}px;
  position: relative;
`

const DialContainer = styled.div`
  height: 2em;
  margin: 1em 0;
  overflow: hidden;
`

const Dial = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  --minor: rgba(255, 255, 255, 0.25);
  --major: rgba(255, 255, 255, 0.75);
  background-image: linear-gradient(
    to right,
    var(--major) 0%,
    var(--major) 1%,
    transparent 1%,
    transparent 100%
  );
  background-size: 10%;
  border-right: 1px solid var(--major);
  cursor: grab;

  :active {
    cursor: grabbing;
  }

  ::after {
    content: '';
    width: 100%;
    height: 50%;
    top: 25%;
    position: absolute;
    background-image: linear-gradient(
      to right,
      var(--minor) 0%,
      var(--minor) 10%,
      transparent 10%,
      transparent 100%
    );
    background-size: 1%;
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

const Slider = () => {
  const [x, setX] = useState(0)
  const [delta, setDelta] = useState(0)
  const position = x + delta

  const onGesture = React.useCallback(isDrag => ({ down, delta, last }) => {
    const [dx] = delta
    const progress = getProgress(x + dx)
    const hasReachedBounds = hasReachedLimit(progress)

    // mouse pointer is pressed, or if it’s a mousewheel event
    if ((down || !isDrag) && !hasReachedBounds) setDelta(constrain(dx))

    // if last event, update the last known position (aka X)
    if (last) {
      setDelta(0)
      setX(x => constrain(x + dx))
    }
  })

  const bind = useGesture({
    onDrag: onGesture(true),
    onWheel: onGesture(false),
  })

  return (
    <Container>
      <DialContainer>
        <AnimatedDial
          {...bind()}
          style={{
            transform: `translate3D(${position}px, 0, 0)`,
          }}
        />
      </DialContainer>
      <SliderValue>{getProgress(position)}%</SliderValue>
    </Container>
  )
}

export default Slider
