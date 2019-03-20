import React from 'react'
import Head from 'next/head'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import PolygonShape from './Polygon'
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

const PolygonElement = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 15px;
  float: ${props => props.float};
  clip-path: ${props => props.shape};
  shape-outside: ${props => props.shape};
  background-image: url(${props => props.backgroundImage});
`

const Polygon = ({ backgroundImage, vertices, size, float }) => {
  const polly = new PolygonShape({ vertices, size })
  const path = polly.getPointsAsClipPath()
  return (
    <PolygonElement
      shape={path}
      size={size}
      backgroundImage={backgroundImage}
      float={float}
    />
  )
}

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
          vertices={10}
          size={220}
          backgroundImage='https://source.unsplash.com/VuBzplNNi0k/220x220'
          float='left'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          vertices={10}
          size={300}
          backgroundImage='https://source.unsplash.com/WLUHO9A_xik/300x300'
          float='right'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          vertices={8}
          size={180}
          backgroundImage='https://source.unsplash.com/H5PnIYI_1I0/300x300'
          float='left'
        />

        <p>{getParagraph()}</p>
        <p>{getParagraph()}</p>

        <Polygon
          vertices={9}
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
