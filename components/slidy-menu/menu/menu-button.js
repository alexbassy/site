import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  z-index: 3;
`

const BurgerButton = styled.button`
  appearance: none;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.15s ease;

  :active {
    opacity: 0.75;
  }
`

const Line = styled.rect`
  transition: transform 0.5s ease;
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

  ${props =>
    props.toggled &&
    css`
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
    <FixedContainer>
      <BurgerButton onClick={onClick}>
        <svg width='34' height='32' xmlns='http://www.w3.org/2000/svg'>
          <Group fillRule='evenodd' toggled={inverted}>
            {lines.map((line, i) => (
              <Fragment key={i}>
                <LightLine {...line} />
                <DarkLine {...line} />
              </Fragment>
            ))}
          </Group>
        </svg>
      </BurgerButton>
    </FixedContainer>
  )
}

MenuButton.propTypes = {
  inverted: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MenuButton
