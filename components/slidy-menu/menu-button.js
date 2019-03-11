import React from 'react'
import PropTypes from 'prop-types'
import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const BurgerButtonWrapper = styled.div`
  margin: 20px;
`

const BurgerButton = styled.button`
  appearance: none;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity .15s ease;

  :active {
    opacity: .75;
  }
`

const enter = keyframes`
  from {
    transform: translateX(-120%);
  }
  to {
    transform: translateX(0);
  }
`

const Line = styled.rect`
  transition: transform .5s ease;
  transition-delay: ${props => props.transitionDelay}s;
`

const LightLine = styled(Line)`
  fill: #fff;
  transform: translateX(0%);
`

const DarkLine = styled(Line)`
  fill: #222;
  transform: translateX(-120%);
`

const Group = styled.g`
  fill: ${props => props.fill};

  ${props => props.toggled && css`
    ${LightLine} {
      transform: translateX(120%);
    }
    ${DarkLine} {
      transform: translateX(0%);
    }
  `}
`

const MenuButton = ({ inverted, onClick }) => {
  const lines = [
    { width: 30, height: 3, transitionDelay: 0.3 },
    { width: 30, height: 3, x: 2, y: 10, transitionDelay: 0.2 },
    { width: 30, height: 3, x: 4, y: 20, transitionDelay: 0.1 },
  ]
  return (
    <BurgerButtonWrapper>
      <BurgerButton onClick={onClick}>
        <svg width='34' height='32' xmlns='http://www.w3.org/2000/svg'>
          <Group fillRule='evenodd' toggled={inverted}>
            {lines.map((line, i) => (
              <>
              <LightLine key={`light:${i}`} {...line} />
              <DarkLine key={`dark:${i}`} {...line} />
              </>
            ))}
          </Group>
        </svg>
      </BurgerButton>
    </BurgerButtonWrapper>
  )
}

MenuButton.propTypes = {
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MenuButton
