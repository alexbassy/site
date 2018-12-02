import React from 'react'
import PropTypes from 'prop-types'
import {
  Actions,
  BackButton,
  Button,
  Container,
  FullHeaderWrapper,
  HeaderBackground,
  HeaderContent,
  HeaderCover,
  HeaderShade,
  StuckHeaderWrapper,
  Title
} from './atoms'
import {
  ASSET_PREFIX,
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT
} from './constants'
import { Slide, Fade } from './transition'

const roundNumber = n => parseFloat(n.toFixed(2))

const FollowButton = () => <Button prominent>Follow</Button>
const AddButton = () => <Button>Add to bowl</Button>

class Header extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.number,
    isStuck: PropTypes.bool
  }

  static defaultProps = {
    isStuck: false
  }

  getHeaderHeight = () => {
    return this.props.isStuck
      ? MINIMISED_HEADER_HEIGHT
      : HEADER_HEIGHT
  }

  getHeaderMargin = () => {
    return this.props.isStuck
      ? 0
      : -this.props.scrollY
  }

  getCurrentHeight = () => {
    return this.props.isStuck
      ? MINIMISED_HEADER_HEIGHT
      : HEADER_HEIGHT - this.props.scrollY
  }

  getTransitionProgress = () => {
    if (this.props.isStuck) return 1
    const distance = MINIMISED_HEADER_HEIGHT - HEADER_HEIGHT
    return roundNumber(-this.props.scrollY / distance)
  }

  render () {
    const { isStuck } = this.props
    const headerHeight = this.getHeaderHeight()
    const currentHeight = this.getCurrentHeight()
    const prog = this.getTransitionProgress()
    const headerMargin = this.getHeaderMargin()
    const bg = `${ASSET_PREFIX}/static/assets/header-scroll-animation/header.jpg`

    return (
      <Container
        style={{ height: headerHeight }}
        offsetY={headerMargin}
        isStuck={isStuck}
      >
        <HeaderBackground image={bg} />
        <HeaderShade height={currentHeight} progress={prog} />
        <HeaderCover progress={prog} />
        <HeaderContent>
          <Fade in={!isStuck}>
            <FullHeaderWrapper>
              <BackButton>← Animals</BackButton>
              <Slide in={!isStuck} reverse>
                <Title full>Tropical Fish</Title>
              </Slide>
              <Slide in={!isStuck} reverse>
                <Actions full>
                  <Button prominent>Follow</Button>
                  <Button>Add to bowl</Button>
                </Actions>
              </Slide>
            </FullHeaderWrapper>
          </Fade>

          <Fade in={isStuck}>
            <StuckHeaderWrapper>
              <Slide in={isStuck}>
                <Title>Tropical Fish</Title>
              </Slide>
              <Slide in={isStuck} appear>
                <Actions>
                  <Slide in={isStuck} delay={80} appear>
                    <Button prominent>Follow</Button>
                  </Slide>
                  <Slide in={isStuck} delay={160} appear>
                    <Button>Add to bowl</Button>
                  </Slide>
                </Actions>
              </Slide>
            </StuckHeaderWrapper>
          </Fade>
        </HeaderContent>
      </Container>
    )
  }
}

export default Header
