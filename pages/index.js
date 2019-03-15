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
  background: #000;
  padding: 0 var(--margin);
`

const Content = styled.main`
  position: relative;
  margin-top: calc(var(--margin) * -1);
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
      <Content>
        <Hello />
        <Links />
      </Content>
    </Container>
  )
}

export default Index
