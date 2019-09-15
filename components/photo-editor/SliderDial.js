import React from 'react'

const height = 30
const minorHeight = height / 1.5
const minorY = (height - minorHeight) / 2
const middleHeight = height / 1.5
const middleY = (height - middleHeight) / 2

export default () => (
  <svg
    viewBox={`0 0 1050 ${height}`}
    preserveAspectRatio='xMinYMin slice'
    xmlns='http://www.w3.org/2000/svg'
  >
    <symbol id='a'>
      <rect width='2' height={height} rx='1' />
      <rect x='10' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='21' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='31' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='41' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='52' y={middleY} width='2' height={middleHeight} rx='1' />
      <rect x='62' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='72' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='82' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='93' y={minorY} width='1' height={minorHeight} rx='1' />
      <rect x='103' width='2' height={height} rx='1' />
    </symbol>
    <g fillRule='evenodd' fill='#eeeeee'>
      <use href='#a' />
      <use href='#a' transform='translate(103)' />
      <use href='#a' transform='translate(206)' />
      <use href='#a' transform='translate(309)' />
      <use href='#a' transform='translate(412)' />
      <use href='#a' transform='translate(515)' />
      <use href='#a' transform='translate(618)' />
      <use href='#a' transform='translate(721)' />
      <use href='#a' transform='translate(824)' />
      <use href='#a' transform='translate(927)' />
    </g>
  </svg>
)
