import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import Hello from '../components/front-page/hello'
import Links from '../components/front-page/links'
import PolygonBackground from '../components/front-page/shapes'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background: #111;
  padding: 0 var(--margin);
`

const Index = () => {
  return (
    <Container>
      <Head>
        <title>Alex Bass / Front-end developer</title>
        <meta
          name='description'
          content='Front-end developer from the UK, based in Barcelona'
        />
      </Head>
      <PolygonBackground/>
      <Hello />
      <Links />
    </Container>
  )
}

export default Index
