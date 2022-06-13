import React from 'react'
import App from 'next/app'
import Head from 'next/head'

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script async data-api='/_hive' src='/bee.js' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
