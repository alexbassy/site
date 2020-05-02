import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Global, css } from '@emotion/core'
import getConfig from 'next/config'

const gaMeasurementID = 'UA-129387017-2'

const analyticsSnippet =
  `window.dataLayer = window.dataLayer || [];` +
  `function gtag(){dataLayer.push(arguments);}` +
  `gtag('js', new Date());` +
  `gtag('config', '${gaMeasurementID}');`

const globalCSS = css`
  :root {
    --yellow: hsl(54, 100%, 48%);
    --margin: 2em;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  html {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Roboto Mono', monospace;
  }
  #__next {
    height: 100%;
  }
  a {
    transition: color 0.25s ease;
  }
`

export default class Page extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const { publicRuntimeConfig } = getConfig()
    return (
      <Html lang='en'>
        <Head>
          <script
            async
            src={
              'https://www.googletagmanager.com/gtag/js?id=' + gaMeasurementID
            }
          />
          <script
            id='ga'
            dangerouslySetInnerHTML={{ __html: analyticsSnippet }}
          />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link
            rel='icon'
            href={`${publicRuntimeConfig.assetPrefix}/assets/favicon.png`}
          />
          <link
            href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Global styles={globalCSS} />
          <Main className='main' />
          <NextScript />
        </body>
      </Html>
    )
  }
}
