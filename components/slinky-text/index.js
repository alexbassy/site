import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import posed from 'react-pose'

import withPoseEntry from '../with-initial-pose'

const Wrap = posed.div({
  on: {
    delayChildren: 300,
    staggerChildren: 60,
  },
  off: {
    staggerChildren: 50,
  },
})

const WrapWithEntry = withPoseEntry(['off', 'on'], Wrap)

const PoseLetter = posed.span({
  on: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 100,
      type: 'spring',
    }
  },
  off: {
    y: 30,
    opacity: 0,
  },
})

const Letter = styled(PoseLetter)`
  display: inline-block;
  white-space: pre;
`

function SlinkyText({ children }) {
  const letters = Array.from(children)
  return (
    <WrapWithEntry>
      {letters.map((letter, i) => (
        <Letter key={`${letter}:${i}`}>{letter}</Letter>
      ))}
    </WrapWithEntry>
  )
}

SlinkyText.propTypes = {
  children: PropTypes.string.isRequired,
}

export default SlinkyText
