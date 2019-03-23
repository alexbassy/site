import React, { useState } from 'react'
import styled from '@emotion/styled'
import { polygonAsClipPath } from './Polygon'
import { Polygon } from './visual-components'

const Wrap = styled.div`
  display: flex;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`

const ShapeContainer = styled.div`
  flex: 1;
`

const ControlsContainer = styled.div`
  flex: 1;
`

export default () => {
  const [numVertices, setNumVertices] = useState(8)
  const path = polygonAsClipPath(numVertices)
  return (
    <Wrap>
      <ShapeContainer>
        <Polygon size={200} path={path} backgroundColor='#000' />
      </ShapeContainer>
      <ControlsContainer>
        <label>
          Steps
          <input
            type='range'
            min={3}
            max={20}
            value={numVertices}
            onChange={ev => {
              setNumVertices(ev.target.value)
            }}
          />
        </label>
      </ControlsContainer>
    </Wrap>
  )
}
