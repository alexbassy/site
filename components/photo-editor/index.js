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
                <KnobWheel />
                <KnobLabel>{item}</KnobLabel>
              </Knob>
            ))}
          </Knobs>
          <Ruler>*Slider*</Ruler>
        </Controls>
      </Container>
    </>
  )
}
