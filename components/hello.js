import React from 'react'
import styled from '@emotion/styled'

const Link = styled.a`
  color: #48ac98;
  :hover {
    color: #48ac98;
  }
  :visited {
    color: #48ac98;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: 640px) {
    text-align: left;
  }
`

const Title = styled.h1`
  font-size: 3.2rem;
  margin: 0 0 25px;
  font-weight: 100;

  @media screen and (min-width: 640px) {
    font-size: 4.5rem;
    margin: 0 0 10px;
  }
`

const Line = styled.p`
  font-size: 1.2rem;
  line-height: 2rem;
  margin: 0;
`

const Hello = () => (
  <Container>
    <Title>Alex Bass</Title>
    <Line>Senior front-end developer, based in Berlin</Line>
  </Container>
)

export default Hello
