import React from 'react'
import PropTypes from 'prop-types'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  ASSET_PREFIX,
  BACKGROUND_COLOR
} from './constants'

const roundNumber = n => parseFloat(n.toFixed(2))

const bgWithAlpha = a => `rgba(0, 0, 0, ${Math.max(0, Math.min(a, 1))})`

const BackButton = (props) => {
  return (
    <button>
      {props.children}
      <style jsx>{`
        button {
          all: unset;
          color: #fff;
        }
      `}</style>
    </button>
  )
}

const Button = ({ prominent, children, ...props }) => {
  return (
    <button {...props}>
      {children}
      <style jsx>{`
        button {
          all: unset;
          color: ${prominent ? '#631' : '#fff'};
          background: ${prominent ? '#fe1' : 'none'};
          display: inline-block;
          margin-right: 20px;
          padding: 5px 12px;
          box-shadow: ${prominent ? 'none' : 'inset 0 0 0 2px #ffffff40'};
        }
      `}</style>
    </button>
  )
}

const MaxHeader = ({ title }) => {
  return (
    <div>
      <BackButton>← Animals</BackButton>
      <h1>{title}</h1>
      <section id='actions'>
        <Button prominent>Follow</Button>
        <Button>Add to list</Button>
      </section>
      <style jsx>{`
        h1 {
          color: #fff;
          font-size: 4.5rem;
          margin: 0 0 1rem;
          letter-spacing: -3px;
          max-width: 100%;
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media screen and (max-width: 1024px) {
          h1 {
            font-size: 3.5rem;
            margin: 1rem 0 2rem;
          }
        }
        @media screen and (max-width: 460px) {
          h1 {
            font-size: 2rem;
            margin: 1rem 0 2rem;
          }
        }
      `}</style>
    </div>
  )
}

const MinHeader = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <section id='actions'>
        <Button prominent>Follow</Button>
        <Button>Add to list</Button>
      </section>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          height: 100%;
        }
        h1 {
          color: #fff;
          font-size: 2rem;
          margin: 0;
          letter-spacing: -3px;
          max-width: 100%;
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        #actions {
          margin-left: auto;
        }
      `}</style>
    </div>
  )
}

class Header extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.number,
    isMinimised: PropTypes.bool
  }

  static defaultProps = {
    isMinimised: false
  }

  getHeaderHeight = () => {
    return this.props.isMinimised
      ? MINIMISED_HEADER_HEIGHT
      : HEADER_HEIGHT
  }

  getHeaderMargin = () => {
    return this.props.isMinimised
      ? 0
      : -this.props.scrollY
  }

  getCurrentHeight = () => {
    return this.props.isMinimised
      ? MINIMISED_HEADER_HEIGHT
      : HEADER_HEIGHT - this.props.scrollY
  }

  getTransitionProgress = () => {
    if (this.props.isMinimised) return 1
    const distance = MINIMISED_HEADER_HEIGHT - HEADER_HEIGHT
    return roundNumber(-this.props.scrollY / distance)
  }

  render () {
    const { isMinimised } = this.props
    const headerHeight = this.getHeaderHeight()
    const currentHeight = this.getCurrentHeight()
    const prog = this.getTransitionProgress()
    const headerMargin = this.getHeaderMargin()
    const bg = `${ASSET_PREFIX}/static/assets/header-scroll-animation/header.jpg`

    const headerStyle = {
      height: `${headerHeight}px`,
      transform: `translateY(${headerMargin}px)`
    }

    const shadeBg = `radial-gradient(
      100% ${currentHeight - MINIMISED_HEADER_HEIGHT}px
      at 50% ,
      ${bgWithAlpha(prog * 0.75)}, ${bgWithAlpha(prog)}
    );`

    return (
      <header style={headerStyle}>
        <div id='header-bg' />
        <div id='header-shade' />
        <div id='header-cover' />
        <div id='inner'>
          {isMinimised
            ? <MinHeader title='Tropical Fish' />
            : <MaxHeader title='Tropical Fish' />}
        </div>
        <style jsx>{`
          header {
            width: 100%;
            position: fixed;
            overflow: hidden;
            top: 0;
          }
          #inner {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
            padding: ${PAGE_PADDING}px;
            overflow: hidden;
            background: linear-gradient(45deg, #000, rgba(0, 0, 0, .3))
          }
          #header-bg {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: ${HEADER_HEIGHT}px;
            background-image: url(${bg});
            background-size: cover;
            background-position: center;
          }
          #header-shade {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: ${currentHeight}px;
            background: ${shadeBg};
          }
          #header-cover {
            position: fixed;
            transform: translateY(${-headerMargin}px);
            top: 0;
            width: 100%;
            height: 80px;
            z-index: 2;
            background: linear-gradient(to bottom, ${bgWithAlpha(prog * 4)}, ${bgWithAlpha(0)});
            opacity: ${isMinimised ? '0' : '1'};
          }
        `}</style>
      </header>
    )
  }
}

export default Header
