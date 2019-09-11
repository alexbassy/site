import React, { useState, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import styled from '@emotion/styled'

const Container = styled.div`
  width: 80%;
  position: relative;
`

const DialContainer = styled.div`
  height: 2em;
  margin: 1em 0;
  overflow: hidden;
`

const Dial = styled.div`
  width: 200%;
  height: 100%;
  position: relative;
  left: -50%;
  --minor: rgba(255, 255, 255, 0.25);
  --major: rgba(255, 255, 255, 0.75);
  background-image: linear-gradient(
    to right,
    var(--major) 0%,
    var(--major) 1%,
    transparent 1%,
    transparent 100%
  );
  background-size: 100px;
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
    background-size: 10px;
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
  // const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
  const [x, setX] = useState(0)
  const [delta, setDelta] = useState(0)

  // 1. Define the gesture
  const onGesture = isDrag => ({ down, delta, last }) => {
    if (down || !isDrag) setDelta(delta[0])
    if (last) {
      setDelta(0)
      setX(x => x + delta[0])
    }
  }

  const [onDrag, onWheel] = [
    useCallback(onGesture(true), [onGesture]),
    useCallback(onGesture(false), [onGesture]),
  ]

  const bind = useGesture({ onDrag, onWheel })

  const translateX = x + delta

  return (
    <Container>
      <DialContainer>
        <AnimatedDial
          // 2. Bind it to a component
          {...bind()}
          style={{
            transform: `translate3D(${translateX}px, 0, 0)`,
          }}
        />
      </DialContainer>
      <SliderValue>{translateX * -1}%</SliderValue>
    </Container>
  )
}

export default Slider
