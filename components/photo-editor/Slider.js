import React, { useReducer, useCallback, useEffect } from 'react'
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

const initialState = {
  containerWidth: undefined,
  x: 0,
  delta: 0,
  isResetting: false,
}

const SET_X = 'setX'
const SET_DELTA = 'setDelta'
const SET_CONTAINER_WIDTH = 'setContainerWidth'
const RESET = 'reset'
const END_RESET = 'endReset'

function sliderReducer(state, action) {
  switch (action.type) {
    case SET_X:
      return { ...state, x: action.payload }
    case SET_DELTA:
      return { ...state, delta: action.payload }
    case SET_CONTAINER_WIDTH:
      return { ...state, containerWidth: action.payload }
    case RESET:
      return {
        ...state,
        x: action.payload,
        delta: state.x + state.delta,
        isResetting: true,
      }
    case END_RESET:
      return {
        ...state,
        delta: 0,
        isResetting: false,
      }
    default:
      throw new Error()
  }
}

const Slider = ({ value, onChange, enabled }) => {
  const containerRef = React.useRef()
  const [{ containerWidth, x, delta, isResetting }, dispatch] = useReducer(
    sliderReducer,
    initialState
  )
  const position = x + delta

  // listen for resize events to resize the container
  // will later use to work out %pc of drag position
  useEffect(() => {
    const onResize = ev => {
      const container = containerRef.current
      if (container)
        dispatch({ type: SET_CONTAINER_WIDTH, payload: container.offsetWidth })
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    // if value is 0, reset the slider
    // otherwise, get the x translation from the progress
    const newPosition =
      value === 0 ? value : getDeltaFromProgress(value, containerWidth)

    dispatch({ type: RESET, payload: newPosition })
    setTimeout(() => dispatch({ type: END_RESET }), 800)
  }, [value, containerWidth])

  const onGesture = isDrag => ({ down, delta, last }) => {
    if (!enabled) return
    const [dx] = delta
    const constrainedDelta = constrain(x + dx, containerWidth)
    const progress = getProgress(constrainedDelta, containerWidth)
    const hasReachedBounds = hasReachedLimit(progress)

    // mouse pointer is pressed, or if it’s a mousewheel event
    if ((down || !isDrag) && !hasReachedBounds)
      dispatch({ type: SET_DELTA, payload: constrain(dx, containerWidth) })

    // if last event, update the last known position (aka X)
    if (last) {
      dispatch({ type: SET_DELTA, payload: 0 })
      dispatch({ type: SET_X, payload: constrain(x + dx, containerWidth) })
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
