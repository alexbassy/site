import React, { useState } from 'react'
import { css, Global } from '@emotion/core'
import {
  Container,
  PhotoSpace,
  PhotoContainer,
  Controls,
  Knobs,
  Knob,
  KnobWheel,
  KnobLabel,
  Ruler,
} from './visual-components'
import Slider from './Slider'

const pageStyles = css`
  body {
    background: black;
  }
`

const controlsKnobs = [
  'auto',
  'exposure',
  'contrast',
  'brightness',
  'saturation',
  'vibrance',
  'sharpness',
]

export default () => {
  const [activeKnob, setActiveKnob] = useState(null)
  return (
    <>
      <Global styles={pageStyles} />
      <Container>
        <PhotoSpace>
          <PhotoContainer />
        </PhotoSpace>
        <Controls>
          <Knobs>
            {controlsKnobs.map(item => (
              <Knob key={item}>
                <KnobWheel
                  isActive={item === activeKnob}
                  onClick={() => setActiveKnob(item)}
                />
                <KnobLabel>{item}</KnobLabel>
              </Knob>
            ))}
          </Knobs>
          <Slider />
        </Controls>
      </Container>
    </>
  )
}
