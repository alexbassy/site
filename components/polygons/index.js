import React, { useState } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import Generator from './generator'
import WallOfText from './wall-of-text'

const Nav = styled.div`
  margin: 20px auto;
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
  cursor: pointer;
  text-decoration: underline;
`

export default ({ view }) => {
  const navigateTo = view => () => Router.push({ pathname: '/playground/polygons', query: { view } })
  return (
    <>
      <Nav>
        <List>
          <Item>
            <Link onClick={navigateTo('generator')}>Generator</Link>
          </Item>
          <Item>
            <Link onClick={navigateTo('wall-of-text')}>Wall of text</Link>
          </Item>
        </List>
      </Nav>
      {view === 'generator' && <Generator />}
      {view === 'wall-of-text' && <WallOfText />}
    </>
  )
}
