import React from 'react'
import Head from 'next/head'
import Hello from '../components/hello'
import Links from '../components/links'
import styled from '@emotion/styled'

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
      <Hello />
      <Links />
    </Container>
  )
}

export default Index
