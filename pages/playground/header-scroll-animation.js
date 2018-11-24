import React from 'react'
import Head from 'next/head'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { assetPrefix } = publicRuntimeConfig

const HEADER_HEIGHT = 300
const MINIMISED_HEADER_HEIGHT = 110
const PAGE_PADDING = 20
const BACKGROUND_COLOR = '#222222'

const HeaderContainer = (props) => {
  return (
    <div>
      {props.children}
      <style jsx>{`
        div {
        }
      `}</style>
    </div>
  )
}

const Header = ({ children }) => {
  const bg = `${assetPrefix}/static/assets/header-scroll-animation/header.jpg`
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

const StickyNav = (props) => {
  return (
    <nav>
      <ul>
        <li data-active>All fish</li>
        <li>Where to buy</li>
        <li>Similar fish</li>
      </ul>
      <style jsx>{`
        nav {
          position: sticky;
          top: ${MINIMISED_HEADER_HEIGHT}px;
          padding: 0 ${PAGE_PADDING}px;
          background: ${BACKGROUND_COLOR};
        }
        ul {
          display: flex;
          padding: 0;
          list-style: none;
        }
        li {
          margin-right: 20px;
          text-transform: uppercase;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 1px;
          color: #ffffff80;
          transition: color .2s ease;
        }
        li:hover {
          color: #fff;
        }
        li[data-active] {
          color: #fff;
          border-bottom: 1px solid #fff;
        }
      `}</style>
    </nav>
  )
}

const SkeletonContentItem = (props) => {
  return (
    <li>
      <div data-id='avatar'></div>
      <div data-id='fakename'></div>
      <div data-id='fakealbum'></div>
      <style jsx>{`
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #ffffff20;
        padding: 0 ${PAGE_PADDING}px;
      }
      [data-id=avatar] {
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        border-radius: 32px;
        margin-right: 20px;
        background: #ffffff20;
      }
      [data-id=fakename],
      [data-id=fakealbum] {
        flex: 1;
        background: #ffffff20;
        height: 14px;
      }
      [data-id=fakename] {
        margin-right: 20px;
      }
      `}</style>
    </li>
  )
}

const SkeletonContent = (props) => {
  return (
    <div>
      <ul>
        {[...Array(50).keys()].map(k =>
          <SkeletonContentItem key={k} />)}
      </ul>
      <style jsx>{`
        ul {padding: 0}
      `}</style>
    </div>
  )
}

export default () => (
  <div>
    <Head>
      <title>iOS/Spotify style header animation / Alex Bass</title>
    </Head>
    <div id='container'>
      {/* <HeaderContainer> */}
        <Header>Tropical Fish</Header>
        <StickyNav />
      {/* </HeaderContainer> */}
      <SkeletonContent />
    </div>
    <style jsx>{`
      #container {
        display: flex;
        flex-direction: column;
        background: ${BACKGROUND_COLOR};
      }
    `}</style>
  </div>
)
