import { cloneElement } from 'react'
import { Transition } from 'react-transition-group'

const BaseTransiton = ({ duration, delay, defaultStyle, states, ...props }) => (
  <Transition timeout={duration + delay} {...props}>
    {state =>
      cloneElement(props.children, {
        style: {
          ...defaultStyle,
          ...states[state],
        },
        'aria-hidden': state === 'exited',
      })
    }
  </Transition>
)

export const Slide = ({
  duration = 250,
  delay = 0,
  reverse = false,
  ...props
}) => {
  const offset = 15

  const defaultStyle = {
    opacity: 0,
    transform: `translateY(${reverse ? offset * -1 : offset}px)`,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`,
  }

  const states = {
    entering: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    entered: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    exiting: {
      opacity: 0,
      transform: `translateY(${offset}px)`,
    },
    exited: {
      opacity: 0,
      transform: `translateY(${offset}px)`,
    },
  }

  return (
    <BaseTransiton states={states} defaultStyle={defaultStyle} {...props} />
  )
}

export const Fade = ({
  duration = 250,
  delay = 0,
  reverse = false,
  ...props
}) => {
  const defaultStyle = {
    opacity: 0,
    transition: `opacity ${duration}ms ease`,
    transitionDelay: `${delay}ms`,
  }

  const states = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  return (
    <BaseTransiton states={states} defaultStyle={defaultStyle} {...props} />
  )
}
