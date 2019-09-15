import styled from '@emotion/styled'
import { SMALL_SCREEN } from './constants'

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-template-rows: 60vh 40vh;
`

export const PhotoSpace = styled.div`
  flex: 5;
  padding: 5vh;
`

export const PhotoContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);

  ${SMALL_SCREEN} {
  }
`

export const Controls = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Knobs = styled.ul`
  width: 100%;
  display: flex;
  overflow-x: auto;
  padding: 0.2em 0;
  margin: 0;
`

export const Knob = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1em;
  list-style: none;
  color: white;
`

const idleShadow = `0 0 0 1px rgba(255, 255, 255, 0.5)`
const activeShadow = `0 2px #bbbbbb, 0 2px 5px rgba(0,0,0,0.8), 0 1px 8px 4px rgba(255, 255, 255, 0.4)`

export const KnobWheel = styled.button`
  /* Button reset */
  display: block;
  appearance: none;
  border: none;
  padding: 0;
  font-size: inherit;
  background-color: unset;
  -webkit-tap-highlight-color: transparent;
  /* End button reset */

  --size: 2.5em;
  width: var(--size);
  height: var(--size);
  margin-bottom: 0.65em;
  border-radius: var(--size);
  box-shadow: 0 0 0 1px;
  background: ${props => (props.isActive ? 'white' : 'none')};
  box-shadow: ${props => (props.isActive ? activeShadow : idleShadow)};
  transition-property: box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  cursor: pointer;

  :focus {
    outline: none;
    box-shadow: ${activeShadow};
  }

  ${props =>
    props.isActive &&
    `+ ${KnobLabel} {
    color: white;
  }
  `}
`

export const KnobLabel = styled.span`
  font-size: 60%;
  text-transform: uppercase;
  letter-spacing: 1px;
  user-select: none;
  color: ${props => (props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)')};

  ${SMALL_SCREEN} {
    font-size: 40%;
    font-weight: 600;
  }
`
