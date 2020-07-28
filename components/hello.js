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

const N26 = () => (
  <Link href='https://www.n26.com/' target='_blank' rel='noopener'>
    N26
  </Link>
)

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
    <Line>Front-end developer</Line>
    <Line>
      Find me at <N26 /> in Berlin
    </Line>
  </Container>
)

export default Hello
