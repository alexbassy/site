import styled from '@emotion/styled'
import posed from 'react-pose'
import { VISIBLE, ANIMATION_DURATION, HIDDEN } from './constants'

const PoseScreen = posed.div({
  [VISIBLE]: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: ANIMATION_DURATION,
    },
  },
  [HIDDEN]: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: ANIMATION_DURATION,
    },
  },
})

const Screen = styled(PoseScreen)`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuMjMuNTg0bDMuMTMgMy4wMjgtMTIuODIgMTIuOTIyIDEyLjgyIDEzLjEyMy0zLjEzIDIuOTI3LTEyLjYxNy0xMy4xMjMtMTIuNzIgMTMuMTIzLTMuMTI5LTIuOTI3IDEyLjYxOC0xMi45MjJMLjc2NCAzLjYxMiAzLjg5NC41ODQgMTYuNDEgMTMuODA4eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+'),
    auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: ${props => (props.isVisible ? 'all' : 'none')};
`

export default Screen
