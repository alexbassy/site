import React from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import getConfig from 'next/config'
import IsoLink from 'next-isomorphic-link'
import { BACK_ARROW } from '../../lib/constants'

const ASSET_PREFIX = getConfig().publicRuntimeConfig.assetPrefix

const Content = styled.main`
  padding: 20px var(--margin);
  text-align: center;

  @media screen and (min-width: 500px) {
    text-align: left;
  }
`

const BackLink = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding: 2px;
  cursor: pointer;

  :hover {
    color: white;
  }

  :focus {
    outline: none;
    transition: box-shadow 0.25s ease;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    position: absolute;
    left: var(--margin);
  }
`

const Title = styled.h1`
  color: #fff;
  font-weight: 100;

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

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;

  @media screen and (min-width: 500px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 500px) {
    width: 200px;
    margin: 0 auto;
  }
`

const ListItem = styled.li`
  @media screen and (max-width: 500px) {
    display: block;
    position: relative;
    margin: 0 0 calc(var(--margin) * 1.5);
  }

  @media screen and (min-width: 500px) {
    margin: 0 var(--margin) var(--margin) 0;
  }
`

function getBoxShadow(state, backgroundColor = 'black') {
  return state === 'focus'
    ? `0 0 0 4px black, 0 0 0 6px white, 0 0 14px 8px ${backgroundColor}`
    : `0 0 0 2px black, 0 0 0 4px black`
}

const CardItem = styled.div`
  width: 200px;
  height: 270px;
  padding: 20px;
  color: #fff;
  text-align: left;
  border-radius: 12px;
  background-color: ${props => props.backgroundColor};
  background-image: url(${props => props.backgroundImage});
  background-blend-mode: ${props => props.blendMode};
  background-position: bottom right;
  background-repeat: no-repeat;
  box-shadow: ${getBoxShadow('blur')};
  transition: box-shadow 0.25s ease;
  cursor: pointer;
`

const CardLink = styled.a`
  display: block;
  text-decoration: none;

  :focus {
    outline: none;
  }

  :focus-within ${CardItem} {
    box-shadow: ${props => getBoxShadow('focus', props.backgroundColor)};
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
    <IsoLink href={`${ASSET_PREFIX}/playground/${props.link}`}>
      <CardLink {...props}>
        <CardItem
          {...props}
          backgroundImage={`${ASSET_PREFIX}/static/assets/playground/${props.backgroundImage}`}
        >
          <CardTitle>
            <Title />
          </CardTitle>
        </CardItem>
      </CardLink>
    </IsoLink>
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
    Title: () => <span style={{ color: '#005a3e' }}>Polygons and masks</span>,
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
      <IsoLink href='..'>
        <BackLink>{BACK_ARROW} Back</BackLink>
      </IsoLink>
      <Title>Playground</Title>
      <Subtitle>Experiments and points of reference</Subtitle>
      <List>
        {cards.map(card => (
          <ListItem key={card.link}>
            <Card {...card} />
          </ListItem>
        ))}
      </List>
    </Content>
  </div>
)
