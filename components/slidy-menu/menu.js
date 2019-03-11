import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import posed from 'react-pose'

import MenuButton from './menu-button'
import InPortal from './in-portal'

const screenAnimationDuration = 400
const VISIBLE = 'visible'
const HIDDEN = 'hidden'

const menuItems = [
  { name: 'Startseite' },
  { name: 'Mitteilungen' },
  { name: 'Nachrichten' },
]

const MenuWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  ${props => props.isOpen && `
    width: 100%;
    height: 100%;
  `}
`

const MenuButtonWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`

const PoseScreen = posed.div({
  [VISIBLE]: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: screenAnimationDuration,
    }
  },
  [HIDDEN]: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: screenAnimationDuration,
    }
  }
})

const Screen = styled(PoseScreen)`
  position: fixed;
  background: rgba(0, 0, 0, .5);
  cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuMjMuNTg0bDMuMTMgMy4wMjgtMTIuODIgMTIuOTIyIDEyLjgyIDEzLjEyMy0zLjEzIDIuOTI3LTEyLjYxNy0xMy4xMjMtMTIuNzIgMTMuMTIzLTMuMTI5LTIuOTI3IDEyLjYxOC0xMi45MjJMLjc2NCAzLjYxMiAzLjg5NC41ODQgMTYuNDEgMTMuODA4eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+'), auto;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: ${props => props.isVisible ? 'all' : 'none'};
`

const PoseNav = posed.nav({
  [VISIBLE]: {
    x: 0,
    transition: {
      ease: 'easeInOut',
      duration: screenAnimationDuration,
    },
  },
  [HIDDEN]: {
    x: '-100%',
    transition: {
      ease: 'easeInOut',
      duration: screenAnimationDuration,
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
    }
  },
  [HIDDEN]: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 500,
    }
  },
})

const Item = styled(PoseItem)`
  font-size: 22px;
  margin-bottom: 20px;

  ::before {
    counter-increment: items;
    content: counter(items);
    color: rgba(0, 0, 0, .25);
    margin-right: 10px;
    font-size: 16px;
  }
`

const Menu = ({ isOpen, setOpen }) => {
  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)
  const poseState = isOpen ? VISIBLE : HIDDEN
  return (
    <MenuWrap isOpen={isOpen}>
      <MenuButtonWrap>
        <MenuButton
          inverted={isOpen}
          onClick={toggleOpen}
        />
      </MenuButtonWrap>
      <Screen
        pose={poseState}
        isVisible={isOpen}
        onClick={handleClose}
      />
      <Nav pose={poseState}>
        <List pose={poseState}>
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
