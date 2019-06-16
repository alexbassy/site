import React, { useState, useCallback } from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { Polygon } from './visual-components'
import { polygonAsClipPath } from './Polygon'
import {
  sources,
  initialise as initialiseLoremIpsum,
  getParagraph,
} from '../../lib/loremipsum'

const pageStyles = css`
  body {
    background: linear-gradient(#001313, #001b2f);
    background-attachment: fixed;
  }
  ::selection {
    background: #b39400;
    color: #fff;
  }
`

const Wrap = styled.section`
  max-width: 800px;
  margin: 50px auto;
  font-size: 14px;
  line-height: 2;
  text-align: justify;
  color: #6cb2e6;
`

const P = styled.p`
  transition: color .25s ease;
  :hover {
    color: #fff;
  }
`

const UnstyledButton = styled.button`
  all: unset;
  padding: 2px 10px;
  color: var(--links);
  ${props => props.active && `
    background: var(--links);
    color: black;
  `};
`

export default () => {
  const [lang, setLang] = useState('de')

  const handleClick = useCallback(
    lang => () => {
      setLang(lang)
    },
    [setLang],
  )

  initialiseLoremIpsum(lang)

  return (
    <>
      <Global styles={pageStyles} />
      <Wrap lang={lang}>
        {Object.keys(sources).map(option => (
          <UnstyledButton
            key={option}
            active={lang === option}
            onClick={handleClick(option)}
          >
            {option.toUpperCase()}
          </UnstyledButton>
        ))}

        <P>{getParagraph()}</P>
        <Polygon
          path={polygonAsClipPath(6)}
          size={220}
          backgroundImage='https://source.unsplash.com/VuBzplNNi0k/440x440'
          float='left'
        />
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <Polygon
          path={polygonAsClipPath(8)}
          size={300}
          backgroundImage='https://source.unsplash.com/WLUHO9A_xik/600x600'
          float='right'
        />
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <Polygon
          path={polygonAsClipPath(10)}
          size={180}
          backgroundImage='https://source.unsplash.com/H5PnIYI_1I0/360x360'
          float='left'
        />
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <Polygon
          path={polygonAsClipPath(12)}
          size={300}
          backgroundImage='https://source.unsplash.com/5NE6mX0WVfQ/600x600'
          float='right'
        />
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
        <P>{getParagraph()}</P>
      </Wrap>
    </>
  )
}
