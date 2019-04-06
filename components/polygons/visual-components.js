import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const unitise = n => typeof n === 'number' ? `${n}px` : n

const PolygonElement = styled.div`
  width: ${props => unitise(props.size)};
  height: ${props => unitise(props.size)};
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
  ...props
}) => {
  return (
    <PolygonElement
      path={path}
      size={size}
      backgroundImage={backgroundImage}
      backgroundColor={backgroundColor}
      float={float}
      {...props}
    />
  )
}

Polygon.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  path: PropTypes.string,
  size: PropTypes.number,
  float: PropTypes.oneOf(['left', 'right']),
}