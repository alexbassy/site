import React from 'react'
import PropTypes from 'prop-types'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  ASSET_PREFIX
} from './constants'

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
      : HEADER_HEIGHT - this.props.scrollY
  }

  render () {
    const { isMinimised } = this.props
    const headerHeight = this.getHeaderHeight()
    const bg = `${ASSET_PREFIX}/static/assets/header-scroll-animation/header.jpg`

    return (
      <header>
        <img
          id='header-bg'
          src={bg}
          alt='fishies'
        />
        <div id='inner'>
          {!isMinimised &&
            <BackButton>← Animals</BackButton>}
          <h1>Tropical Fish</h1>
          <section id='actions'>
            <Button prominent>Follow</Button>
            <Button>Add to list</Button>
          </section>
        </div>
        <style jsx>{`
          header {
            width: 100%;
            height: ${headerHeight}px;
            position: fixed;
            top: 0;
          }
          #inner {
            position: relative;
            height: ${!isMinimised ? HEADER_HEIGHT : MINIMISED_HEADER_HEIGHT}px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 100%;
            height: 100%;
            padding: ${PAGE_PADDING}px;
            overflow: hidden;
            background: linear-gradient(45deg, #000, #00000030)
          }
          #header-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          h1 {
            color: #fff;
            font-size: ${isMinimised ? '2rem' : '4rem'};
            margin: 1.2rem 0 1.8rem;
            max-width: 100%;
            white-space: pre;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `}</style>
      </header>
    )
  }
}

export default Header
