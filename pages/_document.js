import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

const analyticsSnippet = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-129387017-1');
`.trim()

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    const { publicRuntimeConfig } = getConfig()
    return (
      <html lang='en'>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel="icon" href={`${publicRuntimeConfig.assetPrefix}/static/assets/favicon.png`} />
          <link href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,700' rel='stylesheet' />
          <script id='ga' dangerouslySetInnerHTML={{ __html: analyticsSnippet }} />
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
            margin: 0;
            padding: 0;
            height: 100%;
            font-family: 'Roboto Mono', monospace;
          }
          #__next {
            height: 100%;
          }
          a, a:visited {
            color: var(--links);
            font-weight: 700;
          }
          a:hover {
            color: var(--links);
          }
          `}</style>
        </Head>
        <body>
          <Main className='main' />
          <NextScript />
          <script async src='https://www.googletagmanager.com/gtag/js?id=UA-129387017-1' />
        </body>
      </html>
    )
  }
}
