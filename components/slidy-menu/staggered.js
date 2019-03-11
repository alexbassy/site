import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default class Staggered extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    stateStyles: PropTypes.object,
    stagger: PropTypes.number,
    timeout: PropTypes.number,
  }
  render () {
    const {
      enabled,
      timeout,
      children,
      stateStyles,
    } = this.props

    console.log(enabled)
    return (
      <TransitionGroup component={null}>
        {React.Children.map(children, (Child, i) => {
          return (
            <CSSTransition
              key={i}
              in={true}
              timeout={timeout}
              classNames='gobble'
            >
              {Child}
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    )
  }
}
