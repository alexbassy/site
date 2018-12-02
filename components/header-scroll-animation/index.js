import React from 'react'
import PropTypes from 'prop-types'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import withScrollY from './with-scrolly'
import Header from './header'
import Nav from './nav'
import SkeletonContent from './skeleton-content'
import { BACKGROUND_COLOR, MINIMISATION_BREAKPOINT } from './constants'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${BACKGROUND_COLOR};
`
class HeaderScrollAnimationExample extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.number
  }

  state = {
    headerMinimised: false
  }

  shouldMinimise = () => {
    const shouldMinimise = this.props.scrollY >= MINIMISATION_BREAKPOINT
    if (!this.state.headerMinimised && shouldMinimise) {
      return true
    } else if (this.state.headerMinimised && !shouldMinimise) {
      return false
    }
  }

  render () {
    return (
      <Container>
        <Global
          styles={{
            body: {
              backgroundColor: BACKGROUND_COLOR,
            },
            '[aria-hidden=true]': {
              width: 0,
              height: 0,
              visibility: 'hidden'
            }
          }}
        />
        <Header
          isStuck={this.shouldMinimise()}
          scrollY={this.props.scrollY}
        />
        <Nav />
        <SkeletonContent />
      </Container>
    )
  }
}

export default withScrollY(HeaderScrollAnimationExample)
