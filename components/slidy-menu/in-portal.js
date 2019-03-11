import React, { Component } from 'react'
import { createPortal } from 'react-dom'

const isServer = typeof document === 'undefined'

export default WrappedComponent => {
  return class extends Component {
    constructor() {
      super()
      if (isServer) return
      this.container = document.createElement('div')
    }

    componentDidMount() {
      if (isServer) return
      document.body.insertAdjacentElement('beforeend', this.container)
    }

    componentWillUnmount() {
      if (isServer) return
      document.body.removeChild(this.container)
    }

    render() {
      if (isServer) {
        return <WrappedComponent {...this.props} />
      }

      return createPortal(<WrappedComponent {...this.props} />, this.container)
    }
  }
}
