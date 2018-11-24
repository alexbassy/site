import React from 'react'
import Head from 'next/head'
import Header from './header'
import Nav from './nav'
import SkeletonContent from './skeleton-content'
import { BACKGROUND_COLOR } from './constants'

export default () => (
  <div>
    <Head>
      <title>iOS/Spotify style header animation / Alex Bass</title>
    </Head>
    <div id='container'>
      <Header>Tropical Fish</Header>
      <Nav />
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
