import React from 'react'
import Head from 'next/head'

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
  return (
    <header>
      <button id='back'>
        ← Animals
      </button>
      <h1>{children}</h1>
      <section id='actions'>
        <button data-cta>Follow</button>
        <button>Add to list</button>
      </section>
      <style jsx>{`
        header {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 300px;
          padding: 0 20px;
          position: sticky;
          top: -20px;
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
          line-height: 1rem;
          margin: 2.4rem 0 3.6rem;
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
          top: 50px;
          padding: 0 20px;
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
        padding: 0 20px;
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
        background: #222;
      }
    `}</style>
  </div>
)
