import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const pageStyles = css`
  body {
    background: #133c55;
  }
`

export const Page = styled.div`
  max-width: 80ch;
  min-height: 100%;
  color: #fff;
  position: absolute;
  padding: 2em;
`

export const Title = styled.h1`
  font-family: 'Fira Sans', sans-serif;
`

export const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 768px;
`

export const Column = styled.div``

const listStyles = css`
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 1rem;
  list-style: none;
`

export const ListContainer = styled(motion.ul)`
  ${listStyles}
  background-color: #59a5d8;
`

export const ListItem = styled.li`
  background-color: ${props => (props.unimportant ? '#59A5D8' : '#84d2f6')};
  min-height: 2rem;
  padding: 0.5rem;
  margin-bottom: 0.75rem;
  border-radius: 5px;
  color: #133c55;
  font-size: 0.85rem;
  font-weight: 600;

  ${props => (props.onClick ? 'cursor: pointer;' : '')}

  :last-of-type {
    margin-bottom: 0;
  }
`

export const AnimatedListItem = ListItem.withComponent(motion.li)

export const Placeholder = styled(motion.ul)`
  ${listStyles}
  height: ${props => props.height}rem;
  background-color: #386fa4;
`
