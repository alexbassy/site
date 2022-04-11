import React from 'react'
import styled from '@emotion/styled'

const Title = styled.h3`
  font-size: 1rem;
  margin: 3rem 0 1rem;
  font-style: italic;
  color: rgb(255 255 255 / 0.5);

  @media screen and (max-width: 640px) {
    text-align: center;
  }
`

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding-left: 0;

  @media screen and (max-width: 640px) {
    flex-wrap: wrap;
    justify-content: center;
    max-width: 270px;
    margin: 15px auto 0;
  }
`

const Item = styled.li`
  display: inline-block;
  margin-right: 1.5rem;
  list-style: none;

  @media screen and (max-width: 640px) {
    display: block;
    text-align: center;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`

const LinkButton = styled.a`
  display: block;
  text-decoration: none;
  border: none;
  opacity: 0.5;
  transition: opacity 0.4s ease;

  :hover,
  :active,
  :visited {
    color: currentColor;
  }

  :hover {
    opacity: 1;
  }
`

const sites = [
  {
    id: 'Stop the Bus',
    url: 'https://stopthebus.xyz',
    img: '/assets/stp.svg',
    description:
      'Stop the Bus: a realtime multiplayer game written in React and TypeScript',
  },
  {
    id: 'Cura',
    url: 'https://curaberlin.de',
    img: '/assets/cura.svg',
    description:
      'Cura is a cultural space in Berlin mixing music and art in an inclusive space',
  },
]

const Sites = () => (
  <>
    <Title>Side projects</Title>
    <List>
      {sites.map(({ id, url, img, description }) => {
        return (
          <Item key={id}>
            <LinkButton href={url} title={description} target='_blank'>
              <img src={img} width={187} height={60} alt={description} />
            </LinkButton>
          </Item>
        )
      })}
    </List>
  </>
)

export default Sites
