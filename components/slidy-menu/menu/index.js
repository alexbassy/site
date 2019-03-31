import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import posed from 'react-pose'

import MenuButton from './menu-button'
import InPortal from '../in-portal'
import Screen from '../screen'
import { VISIBLE, ANIMATION_DURATION, HIDDEN } from '../constants'

const menuItems = [
  { name: 'Startseite' },
  { name: 'Mitteilungen' },
  { name: 'Nachrichten' },
]

const MenuWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  ${props =>
    props.isOpen &&
    `width: 100%;
    height: 100%;`}
`

const PoseNav = posed.nav({
  [VISIBLE]: {
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: ANIMATION_DURATION,
    },
  },
  [HIDDEN]: {
    x: '-100%',
    transition: {
      ease: 'easeInOut',
      duration: ANIMATION_DURATION,
    },
  },
})

const Nav = styled(PoseNav)`
  position: fixed;
  height: 100vh;
  width: 300px;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 40px 40px 0;
  background: #fff;
  color: #222;
  z-index: 2;
  transform: translateY(-100%);
`

const PoseList = posed.ul({
  [VISIBLE]: {
    delayChildren: 300,
    staggerChildren: 100,
  },
  [HIDDEN]: {
    delayChildren: 300,
    staggerChildren: 100,
  },
})

const List = styled(PoseList)`
  list-style: none;
  padding: 0;
  counter-reset: items;
`

const PoseItem = posed.li({
  [VISIBLE]: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 500,
    },
  },
  [HIDDEN]: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 500,
    },
  },
})

const Item = styled(PoseItem)`
  font-size: 22px;
  margin-bottom: 20px;

  ::before {
    counter-increment: items;
    content: counter(items);
    color: rgba(0, 0, 0, 0.25);
    margin-right: 10px;
    font-size: 16px;
  }
`

const Menu = ({ isOpen, setOpen }) => {
  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)
  const poseState = { pose: isOpen ? VISIBLE : HIDDEN }
  return (
    <MenuWrap isOpen={isOpen}>
      <MenuButton inverted={isOpen} onClick={toggleOpen} />
      <Screen {...poseState} isVisible={isOpen} onClick={handleClose} />
      <Nav {...poseState}>
        <List {...poseState}>
          {menuItems.map(({ name }) => (
            <Item key={name}>{name}</Item>
          ))}
        </List>
      </Nav>
    </MenuWrap>
  )
}

Menu.propTypes = {
  setOpen: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default InPortal(Menu)
