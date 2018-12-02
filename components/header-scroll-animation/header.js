import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  ASSET_PREFIX,
  TITLE_TRANSITION_BREAKPOINT
} from './constants'

const roundNumber = n => parseFloat(n.toFixed(2))

const bgWithAlpha = a => `rgba(0, 0, 0, ${Math.max(0, Math.min(a, 1))})`

const BackButton = styled.button`
  all: unset;
  color: #fff;
  -webkit-text-fill-color: currentColor;
`

const Actions = styled.div``

const HeaderWrapper = styled.header`
  ${props => props.stuck && css`
    display: flex;
    align-items: center;
    height: 100%;

    ${Actions} {
      margin-left: auto;
    }

    ${HeaderCover} {
      opacity: 0;
    }
  `}
`

const Button = styled.button`
  all: unset;
  color: ${props => props.prominent ? '#631' : '#fff'};
  -webkit-text-fill-color: currentColor; /* safari fix */
  background: ${props => props.prominent ? '#fe1' : 'none'};
  display: inline-block;
  margin-right: 20px;
  padding: 5px 12px;
  box-shadow: ${props => props.prominent ? 'none' : 'inset 0 0 0 2px #ffffff40'};
`

const Title = styled.h1`
  max-width: 100%;
  font-size: 2.5rem;
  margin: 1rem 0 1.5rem;
  color: #fff;
  letter-spacing: -3px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 460px) {
    font-size: ${props => !props.full ? '2rem' : '3.5rem'};
    margin: ${props => !props.full ? '0' : '1rem 0 2rem'};
  }

  @media screen and (min-width: 1024px) {
    font-size: ${props => !props.full ? '2rem' : '4.5rem'};
    margin: ${props => !props.full ? '0' : '1rem 0 2rem'};
  }
`

const HeaderBackground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  padding: ${PAGE_PADDING}px;
  overflow: hidden;
  background: linear-gradient(45deg, #000, rgba(0, 0, 0, .3));
`

const HeaderCover = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    ${props => bgWithAlpha(props.progress * 4)},
    ${bgWithAlpha(0)}
  );
`

const HeaderShade = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.height}px;
  background: radial-gradient(
    100% ${props => props.height - MINIMISED_HEADER_HEIGHT}px
    at 50%,
    ${props => bgWithAlpha(props.progress * 0.75)}, ${props => bgWithAlpha(props.progress)}
  );
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;
  top: 0;

  ${props => props.isStuck && css`
    position: fixed;

    ${HeaderContent} {
      z-index: 2;
    }
  `}
`

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

    const shadeBg = `radial-gradient(
      100% ${currentHeight - MINIMISED_HEADER_HEIGHT}px
      at 50% ,
      ${bgWithAlpha(prog * 0.75)}, ${bgWithAlpha(prog)}
    );`

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
          <HeaderWrapper stuck={isStuck}>
            {!isStuck && <BackButton>← Animals</BackButton>}
            <Title full={!isStuck}>Tropical Fish</Title>
            <Actions>
              <Button prominent>Follow</Button>
              <Button>Add to list</Button>
            </Actions>
          </HeaderWrapper>
        </HeaderContent>
      </Container>
    )
  }
}

export default Header
