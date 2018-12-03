import React from 'react'
import Head from 'next/head'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import CanvasLib from '../lib/canvas'

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  height: 100%;
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
        <Global
          style={css`

          `}
        />
        <Canvas ref={this.canvasRef} />
      </Container>
    )
  }
}

export default Index
