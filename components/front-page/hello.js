import { useState } from 'react'
import styled from '@emotion/styled'
import posed from 'react-pose'

import getAssetURL from '../../lib/asset'
import SlinkyText from '../slinky-text'
import withPoseEntry from './with-initial-pose'

const titleEntryDuration = 1600
const paragraphStagger = 120

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media screen and (min-width: 640px) {
    text-align: left;
  }
`

const BackgroundImageWrap = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const PosedBackgroundImage = posed.img({
  on: {
    scale: 1.15,
    opacity: 0.3,
    transition: {
      default: { easing: 'easeInOut', duration: 2000 },
      opacity: { duration: 800 },
    },
  },
  off: {
    scale: 1,
    opacity: 0,
    transition: {
      default: { easing: 'easeInOut', duration: 2000 },
      opacity: { duration: 800 },
    },
  },
})

const BackgroundImage = styled(PosedBackgroundImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  mask-image: radial-gradient(#000 20%, rgba(0, 0, 0, 0) 100%);
`

const PosedTitle = posed.h1({
  entering: {
    y: 60,
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
  font-size: 1.25rem;
  line-height: 1.8;
  margin: 0;
  font-weight: 400;
  color: ${props => (props.dimmed ? 'rgba(255, 255, 255, .5)' : '#fff')};
`

const PosedFadeIn = posed.span({
  off: { opacity: 0, y: 5 },
  on: { opacity: 1, y: 0 },
})

const FadeIn = styled(PosedFadeIn)`
  display: inline-block;
  white-space: pre;
`

const BarcelonaText = styled.span`
  cursor: crosshair;
  transition: color 0.5s ease;

  :hover {
    color: yellow;
  }
`

const LocationImage = React.memo(
  ({ wasVisible, isVisible }) => {
    if (!wasVisible) return null
    return (
      <BackgroundImageWrap>
        <BackgroundImage
          initialPose='off'
          pose={isVisible ? 'on' : 'off'}
          src={getAssetURL('bcn.jpg')}
          alt='Barcelona palm trees'
        />
      </BackgroundImageWrap>
    )
  }
)

const Intro = React.memo(({ titlePose, onLocationHover }) => (
  <Container>
    <Line>
      <Staggered delay={titleEntryDuration + paragraphStagger * 2}>
        <FadeIn>Hello, I'm</FadeIn>
      </Staggered>
    </Line>
    <Title pose={titlePose}>
      <SlinkyText>Alex Bass</SlinkyText>
    </Title>
    <Line>
      <Staggered delay={titleEntryDuration + paragraphStagger * 6}>
        <FadeIn>Front-end developer. </FadeIn>
        <FadeIn>Accessibility enthusiast. </FadeIn>
        <FadeIn>Procrastination expert...</FadeIn>
      </Staggered>
    </Line>
    <Line dimmed>
      <Staggered delay={titleEntryDuration + paragraphStagger * 12}>
        <FadeIn>
          Based in{' '}
          <BarcelonaText
            onMouseOver={() => onLocationHover(true)}
            onMouseOut={() => onLocationHover(false)}
          >
            sunny Barcelona
          </BarcelonaText>
        </FadeIn>
      </Staggered>
    </Line>
  </Container>
))

export default () => {
  const [titlePose, setTitlePose] = useState('entering')
  const [isShowingBackgroundImage, showBackgroundImage] = useState(false)
  const [hasHoveredOnCity, hoveredOnCity] = useState(false)
  if (isShowingBackgroundImage && !hasHoveredOnCity) hoveredOnCity(true)
  if (titlePose !== 'entered') {
    setTimeout(() => {
      setTitlePose('entered')
    }, titleEntryDuration)
  }

  return (
    <>
      <LocationImage
        isVisible={isShowingBackgroundImage}
        wasVisible={hasHoveredOnCity}
      />
      <Intro titlePose={titlePose} onLocationHover={showBackgroundImage} />
    </>
  )
}
