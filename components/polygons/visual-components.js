import React from 'react'
import {css} from '@emotion/core'
import styled from '@emotion/styled'

const PolygonElement = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 15px;
  ${props =>
    props.float &&
    `
    float: ${props.float};
    margin-${props.float}: ${props.size * -0.25}px;
  `}
  clip-path: ${props => props.path};
  shape-outside: ${props => props.path};
  background-image: url(${props => props.backgroundImage});
  background-color: ${props => props.backgroundColor};
  background-size: cover;

  @media (max-width: 900px) {
    ${props => props.float && `margin-${props.float}: 0;`}
  }
`

export const Polygon = ({
  backgroundImage,
  backgroundColor,
  path,
  size,
  ...rest
}) => {
  return (
    <PolygonElement
      path={path}
      size={size}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
      {...rest}
    />
  )
}
