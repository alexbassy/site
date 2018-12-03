import styled from '@emotion/styled'

const Typeform = () => <a href='https://www.typeform.com/' target='_blank' rel='noopener'>Typeform</a>

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

export default () => (
  <Container>
    <Title>Alex Bass</Title>
    <Line>Front-end developer</Line>
    <Line>Killing forms @ <Typeform/></Line>
  </Container>
)
