import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'

import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export function reportWebVitals({ id, name, label, value }) {
  gtag.event({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true, // avoids affecting bounce rate.
  })
}

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default CustomApp
