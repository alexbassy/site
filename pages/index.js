import React from 'react'
import Head from 'next/head'
import Hello from '../components/hello.js'
import Links from '../components/links.js'

export default () => (
  <div>
    <Head>
      <title>Alex Bass / Front-end developer</title>
    </Head>
    <style global jsx>{`
      body {
        display: flex;
        flex-direction: column;
        color: var(--text);
        background-color: var(--bg);
      }
      #__next {
        display: flex;
        flex-direction: column;
        flex: 1;
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
