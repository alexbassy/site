import React, { useRef, useEffect } from 'react'
import Head from 'next/head'
import { css, Global } from '@emotion/core'
import Hello from '../components/hello'
import Links from '../components/links'
import Sites from '../components/sites'
import styled from '@emotion/styled'
import CanvasLib from '../lib/canvas'

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background: #000;
  padding: 0 var(--margin);
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
`

const Content = styled.main`
  position: relative;
  margin-top: var(--margin);
`

const Index = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = new CanvasLib(canvasRef.current)
    return () => canvas.destroy()
  }, [])

  return (
    <Container>
      <Head>
        <title>Alex Bass / Senior Software Engineer</title>
        <meta
          name='description'
          content='Senior Software Engineer from Devon, UK, based in Berlin'
        />
      </Head>
      <Global
        styles={css`
          body {
            background-color: #000;
          }
        `}
      />
      <Canvas ref={canvasRef} />
      <Content>
        <Hello />
        <Links />
        <Sites />
      </Content>
    </Container>
  )
}

export default Index
