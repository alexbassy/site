import React, { useState, useEffect } from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import notFoundFallbackImage from '../lib/notFoundFallbackImage'
import { BACK_ARROW } from '../lib/constants'

const reducedMotion = `@media (prefers-reduced-motion: reduce)`

const imagePath =
  'https://media.giphy.com/media/xUOrweAuasNNXOSEeI/giphy-downsized.gif'

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 0.75 }
`

const tunnel = keyframes`
  from { opacity: 0; transform: scale(1.2) }
  to { opacity: 1; transform: scale(1) }
`

const Canvas = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  color: #fff;

  ::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('${imagePath}');
    background-size: cover;
    background-position: center;
    z-index: -1;
    opacity: 0.75;
    animation: ${fadeIn} 3s ease;
    animation-fill-mode: both;
    animation-delay: 0s;
    filter: contrast(1.5) brightness(0.3) saturate(1.2);
  }

  ${reducedMotion} {
    ::after {
      background-image: url('${notFoundFallbackImage}');
      animation-duration: 0;
    }
  }
`

const Content = styled.div`
  font-size: 140%;
  text-align: center;
  max-width: 30ch;
  animation: ${tunnel} 1s ease;
  animation-fill-mode: both;
  margin: 0 1.5rem;

  ${reducedMotion} {
    animation: none;
  }
`

const HomeLink = styled.a`
  color: inherit;
  cursor: pointer;

  :focus {
    outline: 2px solid rgba(255, 255, 255, 0.25);
    outline-offset: 3px;
  }
`

const Title = styled.h1`
  line-height: 100%;
`

const Subtitle = styled.p`
  margin-bottom: 3rem;
`

const Button = styled.a`
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.75rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  :focus {
    outline: 2px solid rgba(255, 255, 255, 0.25);
    outline-offset: 3px;
  }
`

const languages = [
  ['en', 'English', 'Not found'],
  ['de', 'German', 'Nicht gefunden'],
  ['es', 'Spanish', 'No encontrada'],
  ['fr', 'French', 'Non trouvée'],
  ['it', 'Italian', 'Non trovata'],
  ['ru', 'Russian', 'Не найдена'],
  ['ja', 'Japanese', 'ページが見つかりませんでした。'],
  ['cn', 'Chinese (simplified)', '未找到页面'],
]

const getRandomLanguage = () =>
  languages[Math.floor(Math.random() * languages.length)]

const NotFound = () => {
  const [selectedCopy, setSelectedCopy] = useState(getRandomLanguage())

  useEffect(() => {
    setSelectedCopy(getRandomLanguage())
  }, [selectedCopy])

  const [code, language, notFound] = selectedCopy

  return (
    <Canvas>
      <Content>
        <IsoLink href='/'>
          <HomeLink>bass.dev</HomeLink>
        </IsoLink>
        <Title
          title={
            code !== 'en'
              ? `That’s how to say “Not found” in ${language}. At least something on the page might have been useful.`
              : 'Sorry again'
          }
        >
          {notFound}
        </Title>
        <Subtitle>Sorry, that page page doesn’t seem to exist.</Subtitle>
        <IsoLink href='/'>
          <Button>{BACK_ARROW} Go home</Button>
        </IsoLink>
      </Content>
    </Canvas>
  )
}

export default NotFound
