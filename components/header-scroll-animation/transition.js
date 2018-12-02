import { Transition } from 'react-transition-group'

export const Slide = ({
  children,
  duration = 250,
  delay = 0,
  reverse = false,
  ...props
}) => {
  let offset = 10
  if (reverse) offset *= -1

  const defaultStyle = {
    opacity: 0,
    transform: `translateY(${offset}px)`,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`
  }

  const states = {
    entering: {
      opacity: 1,
      transform: `translateY(0px)`
    },
    entered: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    exiting: {
      // position: 'absolute',
      zIndex: '-1'
    },
    exited: {
      width: 0,
      height: 0,
      visibility: 'hidden'
    }
  }

  return (
    <Transition
      timeout={duration + delay}
      {...props}
    >
      {state => (
        React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...states[state]
          }
        })
      )}
    </Transition>
  )
}

export const Fade = ({
  children,
  duration = 250,
  delay = 0,
  reverse = false,
  ...props
}) => {
  let offset = 10
  if (reverse) offset *= -1

  const defaultStyle = {
    opacity: 0,
    transform: `translateY(${offset}px)`,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`
  }

  const states = {
    entering: {
      opacity: 1,
      transform: `translateY(0px)`
    },
    entered: {
      opacity: 1,
      transform: `translateY(0px)`,
    },
    exiting: {
      // position: 'absolute',
      zIndex: '-1'
    },
    exited: {
      width: 0,
      height: 0,
      visibility: 'hidden'
    }
  }

  return (
    <Transition
      timeout={duration + delay}
      {...props}
    >
      {state => (
        React.cloneElement(children, {
          style: {
            ...defaultStyle,
            ...states[state]
          }
        })
      )}
    </Transition>
  )
}
