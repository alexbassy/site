import React from 'react'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import { BACK_ARROW } from '../lib/constants'

const Link = styled.a`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  padding: 2px;
  cursor: pointer;

  :hover {
    color: white;
  }

  :focus {
    outline: none;
    transition: box-shadow 0.25s ease;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }

  @media screen and (max-width: 500px) {
    position: absolute;
    left: var(--margin);
  }
`

const BackLink = () => (
  <IsoLink href='/'>
    <Link>{BACK_ARROW} Back</Link>
  </IsoLink>
)

export default BackLink
