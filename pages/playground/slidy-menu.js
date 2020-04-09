import React from 'react'
import Head from 'next/head'
import SlidyMenu from '../../components/slidy-menu'

export default () => (
  <div>
    <Head>
      <title>Slidy menu animation / Alex Bass</title>
      <meta
        name='description'
        content='The typical burger animated menu but with a bit more pizzazz'
      />
    </Head>
    <SlidyMenu />
  </div>
)
