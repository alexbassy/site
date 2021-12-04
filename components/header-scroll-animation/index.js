import React from 'react'
import PropTypes from 'prop-types'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import withScrollY from './with-scrolly'
import Header from './header'
import Nav from './nav'
import SkeletonContent from './skeleton-content'
import { BACKGROUND_COLOR, MINIMISATION_BREAKPOINT } from './constants'
import { Slide } from './transition'

const codeLink = `//github.com/alexbassy/site/tree/master/components/header-scroll-animation`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${BACKGROUND_COLOR};
`

const CodeLink = styled.div`
  position: fixed;
  background: #fff;
  left: 50%;
  bottom: 10vh;
  margin-left: -100px;
  padding: 20px;
  text-align: center;
`

class HeaderScrollAnimationExample extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.number,
  }

  state = {
    headerMinimised: false,
  }

  shouldMinimise = () => {
    const shouldMinimise = this.props.scrollY >= MINIMISATION_BREAKPOINT
    if (!this.state.headerMinimised && shouldMinimise) {
      return true
    } else if (this.state.headerMinimised && !shouldMinimise) {
      return false
    }
  }

  isAtEndOfPage = () => {
    if (typeof window === 'undefined') return false
    const docHeight = window.document.documentElement.scrollHeight
    return (this.props.scrollY + window.innerHeight) / docHeight >= 0.8
  }

  render() {
    return (
      <Container>
        <Global
          styles={{
            body: {
              backgroundColor: BACKGROUND_COLOR,
            },
          }}
        />
        <Header
          title='Tropical fish'
          isStuck={this.shouldMinimise()}
          scrollY={this.props.scrollY}
        />
        <Nav />
        <SkeletonContent />
        <Slide in={this.isAtEndOfPage()}>
          <CodeLink>
            Get the code{' '}
            <a href={codeLink} target='_blank' rel='noreferrer'>
              here
            </a>
          </CodeLink>
        </Slide>
      </Container>
    )
  }
}

export default withScrollY(HeaderScrollAnimationExample)
