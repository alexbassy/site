import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const pageStyles = css`
  body {
    background: #2e0a3c;
  }
`

export const stopScroll = css`
  body {
    overflow: hidden;
    height: 100vh;
  }
`

export const MobileViewportOuter = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
`

export const MobileViewportInner = styled.div`
  position: relative;
  width: 414px;
  height: 736px;
  overflow-y: auto;
  box-shadow: 0 0 0 1px #ffffff20, 0 0 2px 3px #ffffff20;
`

export const Page = styled.div`
  max-width: 80ch;
  min-height: 100%;
  color: #fff;
  background: #2e0a3c;
  position: absolute;
  padding: 2em;
`

export const Title = styled.h1`
  font-family: 'Fira Sans';
`

export const Subtitle = styled.p`
  font-weight: 700;
`

export const Paragraph = styled.p`
  margin: 1em auto;
`

export const Button = styled.button`
  background-color: #ffffff25;
  color: #fff;
  font-size: 1em;
  padding: 0.5em 0.75em;
  border-radius: 8px;
  border: none;
  -webkit-appearance: none;
  margin: 0 auto;
  transition: background-color 0.2s ease;

  :active {
    background-color: #ffffff40;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 1px 3px rgba(255, 255, 255, 0.2);
  }
`

export const InfoSheetContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  min-height: 40vh;
  padding: 3em 4em;
  background: #fff;
  border-radius: 1.5em;

  ::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 5px;
    background-color: #eee;
    border-radius: 5px;
  }
`

export const InfoSheetCurtain = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
`
