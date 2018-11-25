import React, { Component } from 'react'
import PropTypes from 'prop-types'

const withScrollY = WrappedComponent => {
  return class ScrollHandler extends Component {
    state = {
      ticking: false,
      scrollY: 0,
      lastKnownScrollY: 0
    }

    componentDidMount () {
      window.addEventListener('scroll', this.handleScroll, false);
    }

    componentWillUnmount () {
      window.removeEventListener('scroll', this.handleScroll, false)
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
        scrollY: state.lastKnownScrollY
      }))
    }

    // shouldComponentUpdate (nextProps, nextState) {
    //   if (this.state.scrollY !== nextState.scrollY) {
    //     return true
    //   }
    // }

    render () {
      return <WrappedComponent scrollY={this.state.scrollY} />
    }
  }
}

export default withScrollY