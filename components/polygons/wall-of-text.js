import React from 'react'
import Head from 'next/head'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { Polygon } from './visual-components'
import { polygonAsClipPath } from './Polygon'
import {
  initialise as initialiseLoremIpsum,
  getParagraph,
} from '../../lib/loremipsum'

const pageStyles = css`
  body {
    background: #eac200;
  }
  ::selection {
    background: #b39400;
    color: #fff;
  }
`

const Wrap = styled.div`
  max-width: 800px;
  margin: 50px auto;
  font-size: 14px;
  font-family: 'Roboto Slab', serif;
  line-height: 2;
  text-align: justify;
  color: #5f4a00;
`

export default () => {
  initialiseLoremIpsum()
  return (
    <>
      <Global styles={pageStyles} />
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Roboto+Slab'
          rel='stylesheet'
        />
      </Head>
      <Wrap>
        <p>{getParagraph()}</p>

        <Polygon
          path={polygonAsClipPath(6)}
          size={220}
          backgroundImage='https://source.unsplash.com/VuBzplNNi0k/220x220'
          float='left'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          path={polygonAsClipPath(8)}
          size={300}
          backgroundImage='https://source.unsplash.com/WLUHO9A_xik/300x300'
          float='right'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          path={polygonAsClipPath(10)}
          size={180}
          backgroundImage='https://source.unsplash.com/H5PnIYI_1I0/300x300'
          float='left'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          path={polygonAsClipPath(12)}
          size={300}
          backgroundImage='https://source.unsplash.com/5NE6mX0WVfQ/300x300'
          float='right'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>
      </Wrap>
    </>
  )
}
