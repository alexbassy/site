import React from 'react'
import {
  HEADER_HEIGHT,
  PAGE_PADDING,
  ASSET_PREFIX
} from './constants'

const Header = ({ children }) => {
  const bg = `${ASSET_PREFIX}/static/assets/header-scroll-animation/header.jpg`
  return (
    <header>
      <img
        id='header-bg'
        src={bg}
        alt='fishies'
      />
      <div id='inner'>
        <button id='back'>
          ← Animals
        </button>
        <h1>{children}</h1>
        <section id='actions'>
          <button data-cta>Follow</button>
          <button>Add to list</button>
        </section>
      </div>
      <style jsx>{`
        header {
          position: relative;
          height: ${HEADER_HEIGHT}px;
          position: sticky;
          top: -20px;
        }
        #inner {
          position: relative;
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
        #back {
          color: #fff;
        }
        span[data-arrow] {
          font-variant: normal;
          font-weight: SF Mono;
        }
        h1 {
          color: #fff;
          font-size: 4rem;
          margin: 1.2rem 0 1.8rem;
          max-width: 100%;
          white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        button {
          all: unset;
        }
        #actions button {
          all: unset;
          color: #fff;
          display: inline-block;
          margin-right: 20px;
          padding: 5px 12px;
          box-shadow: inset 0 0 0 2px #ffffff40;
        }
        #actions button[data-cta] {
          color: rgba(170, 100, 170);
          background: yellow;
          box-shadow: none;
        }
      `}</style>
    </header>
  )
}

export default Header
