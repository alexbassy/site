import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import styled from '@emotion/styled'
import Generator from './generator'
import WallOfText from './wall-of-text'

const Nav = styled.div`
  padding: 20px;
  margin: auto;
  max-width: 800px;
  text-align: center;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
`

const Item = styled.li`
  margin: 0 10px;
`

const Link = styled.a`
  color: #fff;
  text-shadow: ${props =>
    props.active
      ? `0 0 10px rgba(255, 255, 255, 0.75)`
      : `0 0 5px rgba(255, 255, 255, 0.25)`};
  transition-property: opacity, text-shadow;
  transition-duration: 0.25s;
  cursor: pointer;
  text-decoration: underline;
  opacity: ${props => (props.active ? 1 : 0.5)};

  :hover {
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.75);
  }
`

export default ({ view }) => {
  const navigateTo = view => () =>
    Router.push({ pathname: '/playground/polygons', query: { view } })

  return (
    <>
      <Nav>
        <List>
          <Item>
            <Link
              onClick={navigateTo('generator')}
              active={view === 'generator'}
            >
              Generator
            </Link>
          </Item>
          <Item>
            <Link
              onClick={navigateTo('wall-of-text')}
              active={view === 'wall-of-text'}
            >
              Wall of text
            </Link>
          </Item>
        </List>
      </Nav>
      {view === 'generator' && <Generator />}
      {view === 'wall-of-text' && <WallOfText />}
    </>
  )
}
