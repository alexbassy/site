import React from 'react'
import Head from 'next/head'
import Hello from '../components/hello.js'
import Links from '../components/links.js'

export default () => (
  <div>
    <Head>
      <title>Alex Bass / Front-end developer</title>
      <link href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,700' rel='stylesheet' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <style global jsx>{`
      :root {
        --text: hsl(56, 100%, 15%);
        --bg: hsl(56, 100%, 50%);
        --links: hsl(30, 100%, 33%);
        --margin: 20px;
      }
      *, *:before, *:after {
        box-sizing: border-box;
      }
      html {
        height: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      body {
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: 'Roboto Mono', monospace;
        color: var(--text);
        background-color: var(--bg);
      }
      #__next {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      a, a:visited {
        color: var(--links);
        font-weight: 700;
      }
      a:hover {
        color: var(--links);
      }
    `}</style>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `}</style>
    <Hello />
    <Links />
  </div>
)
