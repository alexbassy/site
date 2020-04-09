import React, { Component } from 'react'
import PropTypes from 'prop-types'

// source https://www.html5rocks.com/en/tutorials/speed/animations/
const withScrollY = WrappedComponent => {
  return class ScrollHandler extends Component {
    state = {
      ticking: false,
      scrollY: 0,
      lastKnownScrollY: 0,
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll, { passive: true })
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll, { passive: true })
    }

    handleScroll = ev => {
      this.setState({ lastKnownScrollY: window.scrollY })
      this.requestTick()
    }

    requestTick = () => {
      if (!this.state.ticking) {
        requestAnimationFrame(this.updateState)
      }
      this.setState({ ticking: true })
    }

    updateState = () => {
      this.setState(state => ({
        ticking: false,
        scrollY: state.lastKnownScrollY,
      }))
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state.scrollY !== nextState.scrollY
    }

    render() {
      return <WrappedComponent scrollY={this.state.scrollY} />
    }
  }
}

export default withScrollY
