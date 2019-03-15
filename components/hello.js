import { useState } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'

import SlinkyText from './slinky-text'
import withPoseEntry from './with-initial-pose'

const titleEntryDuration = 1600
const paragraphStagger = 600

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: 640px) {
    text-align: left;
  }
`

const PosedTitle = posed.h1({
  entering: {
    y: 80,
    scale: 1.4,
    transformOrigin: 'left',
  },
  entered: {
    y: 0,
    scale: 1,
    transformOrigin: 'left',
    transition: {
      duration: 300,
      type: 'spring',
    },
  },
})

const Title = styled(PosedTitle)`
  font-size: 3.5rem;
  margin: 0 0 25px;
  letter-spacing: 2px;

  @media screen and (min-width: 640px) {
    font-size: 4.5rem;
    margin: 0 0 10px;
  }
`

const PoseStaggeredParent = posed.span({
  on: {
    delayChildren: props => props.delay,
    staggerChildren: paragraphStagger,
  },
})

const Staggered = withPoseEntry(['off', 'on'], PoseStaggeredParent)

const Line = styled.p`
  font-size: 1.5rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 400;
  color: ${props => (props.dimmed ? 'rgba(255, 255, 255, .5)' : '#fff')};
`

const PosedFadeIn = posed.span({
  off: { opacity: 0 },
  on: { opacity: 1 },
})

const FadeIn = styled(PosedFadeIn)`
  display: inline-block;
  white-space: pre;
`

export default () => {
  const [titlePose, setTitlePose] = useState('entering')
  setTimeout(() => setTitlePose('entered'), titleEntryDuration)
  return (
    <Container>
      <Title pose={titlePose}>
        <SlinkyText pat>Alex Bass</SlinkyText>
      </Title>
      <Line>
        <Staggered delay={titleEntryDuration + paragraphStagger}>
          <FadeIn>Front-end developer. </FadeIn>
          <FadeIn>Accessibility enthusiast. </FadeIn>
          <FadeIn>Procrastination expert...</FadeIn>
        </Staggered>
      </Line>
      <Line dimmed>
        <Staggered delay={titleEntryDuration + paragraphStagger * 4}>
          <FadeIn>Based in sunny Barcelona</FadeIn>
        </Staggered>
      </Line>
    </Container>
  )
}
