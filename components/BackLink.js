import React from 'react'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import { useRouter } from 'next/router'
import { BACK_ARROW } from '../lib/constants'

const Link = styled.a`
  text-decoration: none;
  color: ${props =>
    props.invert ? `rgb(0 0 0 / 0.8)` : `rgb(255 255 255 / 0.8)`};
  border-radius: 3px;
  padding: 2px;
  cursor: pointer;

  :hover {
    color: white;
    color: ${props =>
      props.invert ? `rgb(0 0 0 / 0.5)` : `rgb(255 255 255 / 0.5)`};
  }

  :focus {
    outline: none;
    transition: box-shadow 0.25s ease;
    box-shadow: 0 0 0 2px
      ${props => (props.invert ? `rgb(0 0 0 / 0.5)` : `rgb(255 255 255 / 0.5)`)};
  }

  @media screen and (max-width: 500px) {
    position: absolute;
    left: var(--margin);
  }
`

const BackLink = props => {
  const router = useRouter()
  return (
    <IsoLink href={props.absolute ? '/' : router.pathName + '/..'}>
      <Link invert={props.invert}>{BACK_ARROW} Back</Link>
    </IsoLink>
  )
}

export default BackLink
