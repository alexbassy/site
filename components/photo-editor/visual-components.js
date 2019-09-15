import styled from '@emotion/styled'

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-areas:
    'photo'
    'controls';
  grid-template-rows: 2fr 1fr;
`

export const PhotoSpace = styled.div`
  grid-area: photo;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5vh;
`

export const PhotoContainer = styled.div`
  --aspect-ratio: 9 / 24;
  width: 70%;
  padding-bottom: calc(var(--aspect-ratio) * 100%);
  max-height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.5);
`

export const Controls = styled.section`
  grid-area: controls;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Knobs = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
`

export const Knob = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1em 1em 1em;
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
`

export const KnobLabel = styled.span`
  font-size: 65%;
  text-transform: uppercase;
  letter-spacing: 2px;
  user-select: none;
`
