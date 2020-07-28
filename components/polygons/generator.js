import React, { useState, useCallback } from 'react'
import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { polygonAsClipPath } from './Polygon'
import { Polygon } from './visual-components'

const Wrap = styled.div`
  display: flex;
  border-radius: 5px;
`

const ShapeContainer = styled.div`
  position: absolute;

  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
`

const rotate = keyframes`
  from { transform: rotate(20deg); }
  to { transform: rotate(380deg); }
`

const PolygonWrap = styled.div`
  flex: ${props => props.flex};
  display: flex;
  justify-content: center;
`

const FloatingPolygon = styled(Polygon)`
  animation: ${rotate} 40s linear infinite;
`

const ControlsContainer = styled.div`
  display: inline-block;
  background: white;
  font-weight: 600;
  font-size: 14px;
  padding: 10px;
  box-shadow: 5px 5px rgb(255, 0, 0), 10px 10px rgb(0, 210, 0),
    15px 15px rgb(0, 0, 255);
  position: absolute;
  top: 20px;
  left: 20px;
`

const sliderStyles = `
  -webkit-appearance: none;
  display: block;
  height: 20px;
  width: 20px;
  position: relative;
  top: 5px;
  margin-top: -10px;
  cursor: pointer;
  background: purple;
  transition: transform .2s ease;
`

const trackStyles = `
  width: 100%;
  background: linear-gradient(90deg, white 50%, lightgrey 50%);
  background-size: 3px;
  `

const trackStylesFocus = `
  width: 100%;
  background: linear-gradient(90deg, white 50%, #ffb4f0 50%);
  background-size: 3px;
`

const Slider = styled.input`
  display: block;
  margin: 20px 0 10px;

  /* reset */
  -webkit-appearance: none;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  :focus {
    outline: none;
  }

  ::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  /* actual styles */
  ::-webkit-slider-thumb {
    ${sliderStyles};
    clip-path: ${props => props.path};
    shape-outside: ${props => props.path};
  }

  ::-moz-range-thumb {
    ${sliderStyles};
    clip-path: ${props => props.path};
    shape-outside: ${props => props.path};
  }

  :active ::-webkit-slider-thumb {
    transform: scale(1.3);
  }

  :active ::-moz-range-thumb {
    transform: scale(1.3);
  }

  ::-webkit-slider-runnable-track {
    ${trackStyles};
  }

  ::-moz-range-track {
    ${trackStyles};
  }

  :active ::-webkit-slider-runnable-track {
    ${trackStylesFocus};
  }

  :active ::-moz-range-track {
    ${trackStylesFocus};
  }
`

const PolygonGenerator = () => {
  const [numVertices, setNumVertices] = useState(8)
  const handleChange = useCallback(ev => setNumVertices(ev.target.value), [
    setNumVertices,
  ])
  const path = polygonAsClipPath(numVertices)
  return (
    <>
      <ShapeContainer>
        <PolygonWrap flex='2'>
          <FloatingPolygon size={200} path={path} backgroundColor='red' />
        </PolygonWrap>
        <PolygonWrap flex='3'>
          <FloatingPolygon size={400} path={path} backgroundColor='#00d200' />
        </PolygonWrap>
        <PolygonWrap flex='4'>
          <FloatingPolygon size={600} path={path} backgroundColor='blue' />
        </PolygonWrap>
      </ShapeContainer>
      <ControlsContainer>
        <label>
          Vertices
          <Slider
            type='range'
            min={3}
            max={16}
            value={numVertices}
            onChange={handleChange}
            path={path}
          />
        </label>
      </ControlsContainer>
    </>
  )
}

export default PolygonGenerator
