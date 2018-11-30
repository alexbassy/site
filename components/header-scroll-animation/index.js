import React from 'react'
import PropTypes from 'prop-types'
import withScrollY from './with-scrolly'
import Header from './header'
import Nav from './nav'
import SkeletonContent from './skeleton-content'
import { BACKGROUND_COLOR, MINIMISATION_BREAKPOINT } from './constants'

class HeaderScrollAnimationExample extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.number
  }

  state = {
    headerMinimised: false
  }

  shouldMinimise = () => {
    const { scrollY } = this.props
    const { headerMinimised } = this.state
    const shouldMinimise = scrollY >= MINIMISATION_BREAKPOINT

    if (!headerMinimised && shouldMinimise) {
      return true
    } else if (headerMinimised && !shouldMinimise) {
      return false
    }
  }

  render () {
    return (
      <div>
        <Header
          isStuck={this.shouldMinimise()}
          scrollY={this.props.scrollY}
        />
        <Nav />
        <SkeletonContent />
        <style jsx>{`
          div {
            display: flex;
            flex-direction: column;
            background: ${BACKGROUND_COLOR};
          }
        `}</style>
      </div>
    )
  }
}

export default withScrollY(HeaderScrollAnimationExample)
