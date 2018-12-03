import React from 'react'
import Head from 'next/head'
import { Global, css } from '@emotion/core'
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
  padding: 0 var(--margin);
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Content = styled.main`
  position: relative;
`

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount () {
    const controlled = new CanvasLib(this.canvasRef.current)
    this.setState({
      canvas: controlled
    })
  }

  render () {
    return (
      <Container>
        <Head>
          <title>Alex Bass / Front-end developer</title>
          <meta name='description' content='Front-end developer from Devon, UK, based in Barcelona' />
        </Head>
        <Canvas ref={this.canvasRef} />
        <Content>
          <Hello />
          <Links />
        </Content>
      </Container>
    )
  }
}

export default Index
