import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Transition } from 'react-transition-group'

import MenuButton from './menu-button'
import InPortal from './in-portal'

const screenAnimationDuration = 400

const MenuWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  ${props => props.isOpen && `
    width: 100%;
    height: 100%;
  `}
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const MenuButtonWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  padding: 40px 40px 0;
  background: #fff;
  color: #222;
  z-index: 2;
  will-change: transform;
  transform: ${props => !props.isOpen ? `translateX(-100%)` : 'translateX(0)'};
  transition: transform ${screenAnimationDuration}ms ease;
`

const Screen = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, .5);
  cursor: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzMyAzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuMjMuNTg0bDMuMTMgMy4wMjgtMTIuODIgMTIuOTIyIDEyLjgyIDEzLjEyMy0zLjEzIDIuOTI3LTEyLjYxNy0xMy4xMjMtMTIuNzIgMTMuMTIzLTMuMTI5LTIuOTI3IDEyLjYxOC0xMi45MjJMLjc2NCAzLjYxMiAzLjg5NC41ODQgMTYuNDEgMTMuODA4eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+'), auto;
  width: 100%;
  height: 100%;
  transition: opacity ${screenAnimationDuration}ms ease;
  top: 0;
  left: 0;
`

const screenStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const Menu = ({ isOpen, setOpen }) => {
  const toggleOpen = () => setOpen(!isOpen)
  const handleClose = () => setOpen(false)
  return (
    <MenuWrap isOpen={isOpen}>
      <MenuButtonWrap>
        <MenuButton onClick={toggleOpen} />
      </MenuButtonWrap>
      <Transition
        in={isOpen}
        timeout={isOpen ? 0 : 200}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Screen
            style={screenStyles[state]}
            isVisible={isOpen}
            onClick={handleClose}
          />
        )}
      </Transition>
      <Nav isOpen={isOpen}>
        <h3>Menu</h3>
        <List>
          <li>Startseite</li>
          <li>Mitteilungen</li>
          <li>Nachrichten</li>
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
