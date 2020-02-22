import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const pageStyles = css`
  body {
    background: #222;
  }
`

export const stopScroll = css`
  body {
    overflow: hidden;
    height: 100vh;
  }
`

export const Page = styled.div``

export const Button = styled.button`
  background: #0085ca;
  color: #fff;
  font-size: 1.5em;
  padding: 0.5em 0.75em;
  border-radius: 8px;
  border: none;
  -webkit-appearance: none;
`

export const InfoSheetContainer = styled(motion.div)`
  position: fixed;
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
    height: 5px;
    width: 40px;
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
