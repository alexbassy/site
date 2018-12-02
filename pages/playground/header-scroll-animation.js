import React from 'react'
import Head from 'next/head'
import HeaderScrollAnimationExample from '../../components/header-scroll-animation'

export default () => (
  <div>
    <Head>
      <title>iOS/Spotify style header animation / Alex Bass</title>
      <meta name='description' content='Emulating the cool scroll effect found in Spotify, influenced by iOS' />
    </Head>
    <HeaderScrollAnimationExample />
  </div>
)
