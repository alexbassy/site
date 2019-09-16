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
    overflow: hidden;
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

const initialTransformations = controlsKnobs.reduce((transformations, mode) => {
  transformations[mode] = 0
  return transformations
}, {})

export default () => {
  const [activeMode, setActiveMode] = useState(null)
  const [transformations, setTransformations] = useState(initialTransformations)
  const [sliderValue, setSliderValue] = useState(null)

  const onSliderChange = value => {
    setTransformations(t => ({ ...t, [activeMode]: value }))
  }

  const onKnobClick = mode => () => {
    setActiveMode(mode)
    setSliderValue(transformations[mode])
  }

  return (
    <>
      <Global styles={pageStyles} />
      <Container>
        <PhotoSpace>
          <PhotoContainer>
            <pre style={{ color: '#fff' }}>
              {JSON.stringify(transformations, null, 2)}
            </pre>
          </PhotoContainer>
        </PhotoSpace>
        <Controls>
          <Knobs>
            {controlsKnobs.map(mode => {
              const isActive = mode === activeMode
              return (
                <Knob key={mode}>
                  <KnobWheel isActive={isActive} onClick={onKnobClick(mode)} />
                  <KnobLabel isActive={isActive}>{mode}</KnobLabel>
                </Knob>
              )
            })}
          </Knobs>
          <Slider value={sliderValue} onChange={onSliderChange} />
        </Controls>
      </Container>
    </>
  )
}
