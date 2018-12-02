import { css } from '@emotion/core'
import styled from '@emotion/styled'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING
} from './constants'

const bgWithAlpha = a => `rgba(0, 0, 0, ${Math.max(0, Math.min(a, 1))})`

export const BackButton = styled.button`
  all: unset;
  color: #fff;
  -webkit-text-fill-color: currentColor;
`

export const Actions = styled.div``

export const Button = styled.button`
  all: unset;
  color: ${props => props.prominent ? '#631' : '#fff'};
  -webkit-text-fill-color: currentColor; /* safari fix */
  background: ${props => props.prominent ? '#fe1' : 'none'};
  display: inline-block;
  margin-right: 20px;
  padding: 5px 12px;
  text-align: center;
  box-shadow: ${props => props.prominent ? 'none' : 'inset 0 0 0 2px #ffffff40'};
  cursor: pointer;

  :last-child {
    margin-right: 0;
  }
`

export const Title = styled.h1`
  max-width: 100%;
  font-size: ${props => !props.full ? '1.5rem' : '2.5rem'};
  margin: 1rem 0;
  padding-right: 20px;
  color: #fff;
  letter-spacing: -3px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 460px) {
    font-size: ${props => !props.full ? '2rem' : '3.5rem'};
    margin: ${props => !props.full ? '0' : '1rem 0 2rem'};
  }

  @media screen and (min-width: 1024px) {
    font-size: ${props => !props.full ? '2rem' : '4.5rem'};
    margin: ${props => !props.full ? '0' : '1rem 0 2rem'};
  }
`

export const HeaderBackground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(45deg, #000, rgba(0, 0, 0, .3));
`

export const HeaderCover = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  pointer-events: none;
  background-image: linear-gradient(
    to bottom,
    ${props => bgWithAlpha(props.progress * 4)},
    ${bgWithAlpha(0)}
  );
  will-change: background-image;
`

export const HeaderShade = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.height}px;
  pointer-events: none;
  background-image: radial-gradient(
    100% ${props => props.height - MINIMISED_HEADER_HEIGHT}px
    at 50%,
    ${props => bgWithAlpha(props.progress * 0.75)}, ${props => bgWithAlpha(props.progress)}
  );
  will-change: background-image;
`

export const FullHeaderWrapper = styled.header`
  max-width: 100%;
  height: ${HEADER_HEIGHT}px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${PAGE_PADDING}px;

  ${Actions} {
    margin-bottom: 10px;
  }
`

export const StuckHeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: ${MINIMISED_HEADER_HEIGHT}px;
  padding: ${PAGE_PADDING}px;

  ${Actions} {
    margin-left: auto;
  }

  ${HeaderCover} {
    opacity: 0;
  }
`

export const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;

  ${props => props.isStuck && css`
    position: fixed;

    ${HeaderContent} {
      z-index: 2;
    }

    @media screen and (max-width: 460px) {
      ${Actions} {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-width: 120px;
      }

      ${Button} {
        margin: 5px 0;
        font-size: .85rem;
      }
    }
  `}
`
