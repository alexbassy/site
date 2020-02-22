import React from 'react'
import styled from '@emotion/styled'

const VisuallyHidden = styled.span`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`

export default VisuallyHidden
