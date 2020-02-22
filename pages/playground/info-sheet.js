import React from 'react'
import Head from 'next/head'
import InfoSheet from '../../components/info-sheet'

export default () => (
  <div>
    <Head>
      <title>Info Sheet / Alex Bass</title>
      <meta
        name='description'
        content='A neat info sheet component, similar to iOS'
      />
    </Head>
    <InfoSheet />
  </div>
)
