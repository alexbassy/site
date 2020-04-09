import React, { useRef, useEffect } from 'react'
import Head from 'next/head'
import Hello from '../components/hello'
import Links from '../components/links'
import styled from '@emotion/styled'
import CanvasLib from '../lib/canvas'

const Container = styled.div`
  height: 100%;
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
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`

const Content = styled.main`
  position: relative;
  margin-top: calc(var(--margin) * -1);
`

const Index = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = new CanvasLib(canvasRef.current)

    return () => {
      canvas.destroy()
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Alex Bass / Front-end Developer</title>
        <meta
          name='description'
          content='Front-end developer from Devon, UK, based in Berlin'
        />
      </Head>
      <Canvas ref={canvasRef} />
      <Content>
        <Hello />
        <Links />
      </Content>
    </Container>
  )
}

export default Index
