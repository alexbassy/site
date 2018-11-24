import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <html lang='en'>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,700' rel='stylesheet' />
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
        </body>
      </html>
    )
  }
}