import React from 'react'
import styled from '@emotion/styled'

const PolygonElement = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 15px;
  float: ${props => props.float};
  clip-path: ${props => props.path};
  shape-outside: ${props => props.path};
  background-image: url(${props => props.backgroundImage});
  background-color: ${props => props.backgroundColor};
`

export const Polygon = ({
  backgroundImage,
  backgroundColor,
  path,
  size,
  float,
}) => {
  return (
    <PolygonElement
      path={path}
      size={size}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
      float={float}
    />
  )
}
