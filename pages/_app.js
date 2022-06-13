import React from 'react'
import Head from 'next/head'

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script async src='https://hive.bass.dev/sb.js' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
