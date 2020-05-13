import React from 'react'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import { BACK_ARROW } from '../lib/constants'

const Link = styled.a`
  text-decoration: none;
  color: ${props =>
    props.invert ? `rgba(0 0 0 0.3)` : `rgba(255 255 255 0.3)`};
  border-radius: 3px;
  padding: 2px;
  cursor: pointer;

  :hover {
    color: white;
  }

  :focus {
    outline: none;
    transition: box-shadow 0.25s ease;
    box-shadow: 0 0 0 2px
      ${props => (props.invert ? `rgba(0 0 0 0.5)` : `rgba(255 255 255 0.5)`)};
  }

  @media screen and (max-width: 500px) {
    position: absolute;
    left: var(--margin);
  }
`

const BackLink = props => (
  <IsoLink href={props.absolute ? '/' : '..'}>
    <Link>{BACK_ARROW} Back</Link>
  </IsoLink>
)

export default BackLink
