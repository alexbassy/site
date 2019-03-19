import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import getConfig from 'next/config'

const ASSET_PREFIX = getConfig().publicRuntimeConfig.assetPrefix

const Content = styled.main`
  padding: 20px 30px;
  text-align: center;

  @media screen and (min-width: 460px) {
    text-align: left;
  }
`

const Title = styled.h1`
  color: #fff;
  font-weight: 100;
`

const Subtitle = styled.h2`
  color: #ffffff80;
  font-weight: 100;
  font-size: 20px;
  margin: 0 0 40px;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;

  @media screen and (min-width: 460px) {
    justify-content: flex-start;
  }
`

const UnstyledLink = styled.a`
  text-decoration: none;
`

const CardItem = styled.div`
  width: 200px;
  height: 270px;
  padding: 20px;
  margin: 0 0 30px;
  color: #fff;
  text-align: left;
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
  background-image: url(${props => props.backgroundImage});
  background-blend-mode: ${props => props.blendMode};
  background-position: bottom right;
  background-repeat: no-repeat;
  cursor: pointer;

  @media screen and (min-width: 460px) {
    margin: 0 30px 30px 0;
  }
`

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 100;
  letter-spacing: -1.5px;
  text-decoration: none;
`

const Card = ({ Title, ...props }) => {
  return (
    <Link href={`${ASSET_PREFIX}/playground/${props.link}`}>
      <UnstyledLink>
        <CardItem
          {...props}
          backgroundImage={`${ASSET_PREFIX}/static/assets/playground/${
            props.backgroundImage
          }`}
        >
          <CardTitle>
            <Title />
          </CardTitle>
        </CardItem>
      </UnstyledLink>
    </Link>
  )
}

const cards = [
  {
    Title: () => 'Responsive/HiDPI images',
    backgroundColor: `#af36e8`,
    backgroundImage: `responsive-images.svg`,
    blendMode: 'color-burn',
    link: 'responsive-images',
  },
  {
    Title: () => (
      <span>
        Scrolling header <i>ala</i> Spotify
      </span>
    ),
    backgroundColor: `#2d788d`,
    backgroundImage: `marine-header.svg`,
    blendMode: 'color-burn',
    link: 'header-scroll-animation',
  },
  {
    Title: () => 'Slidy menu',
    backgroundColor: `#e0a000`,
    backgroundImage: `slidy-menu.svg`,
    link: 'slidy-menu',
  },
  {
    Title: () => <span style={{ color: '#005a3e' }}>Easy polygons</span>,
    backgroundColor: `#00e098`,
    backgroundImage: `polygons.svg`,
    blendMode: 'hard-light',
    link: 'polygons',
  },
]

export default () => (
  <div>
    <Head>
      <title>Playground / Alex Bass</title>
    </Head>
    <Global
      styles={{
        body: {
          backgroundColor: '#000',
        },
      }}
    />
    <Content>
      <Title>Playground</Title>
      <Subtitle>Experiments and points of reference</Subtitle>
      <List>
        {cards.map(card => (
          <li key={card.link}>
            <Card {...card} />
          </li>
        ))}
      </List>
    </Content>
  </div>
)
