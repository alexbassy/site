import React from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import BackLink from '../../components/BackLink'

const Content = styled.main`
  padding: 20px var(--margin);
  text-align: center;

  @media screen and (min-width: 500px) {
    text-align: left;
  }
`

const Title = styled.h1`
  color: #fff;
  font-weight: 400;

  @media screen and (max-width: 500px) {
    margin-top: var(--margin);
  }
`

const Subtitle = styled.h2`
  color: #ffffff80;
  font-weight: 100;
  font-size: 20px;
  margin: 0 0 40px;
`

export default () => (
  <div>
    <Head>
      <title>Thoughts / Alex Bass</title>
    </Head>
    <Global
      styles={{
        body: {
          backgroundColor: '#000',
        },
      }}
    />
    <Content>
      <IsoLink href='..'>
        <BackLink />
      </IsoLink>
      <Title>Thoughts</Title>
      <Subtitle>
        Not succinct enough to call a blog, but not really ramblings either.
      </Subtitle>
    </Content>
  </div>
)
