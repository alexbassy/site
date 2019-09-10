import React, { useState } from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'

const pageStyles = css`
  body {
    background: black;
  }
`

const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-areas:
    'photo'
    'controls';
  grid-template-rows: 3fr 1fr;
`

const Controls = styled.section`
  grid-area: controls;
`

const Knobs = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
`

const Knob = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1em 1em 1em;
  list-style: none;
  color: white;
`

const KnobWheel = styled.button`
  /* Button reset */
  display: block;
  appearance: none;
  border: none;
  padding: 0;
  font-size: inherit;
  background-color: unset;
  /* End button reset */
  cursor: pointer;
  --size: 2.5em;
  width: var(--size);
  height: var(--size);
  margin-bottom: 0.5em;
  border-radius: var(--size);
  box-shadow: 0 0 0 1px white;
  transition-property: box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;

  :focus {
    outline: none;
    box-shadow: 0 0 0 1px white, 0 0 3px 5px rgba(255, 255, 255, 0.3);
  }
`

const KnobLabel = styled.span`
  font-size: 70%;
  text-transform: uppercase;
  letter-spacing: 2px;
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
        <Controls>
          <Knobs>
            {controlsKnobs.map(item => (
              <Knob key={item}>
                <KnobWheel />
                <KnobLabel>{item}</KnobLabel>
              </Knob>
            ))}
          </Knobs>
        </Controls>
      </Container>
    </>
  )
}
