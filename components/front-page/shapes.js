import styled from '@emotion/styled'
import { polygonAsClipPath } from '../polygons/Polygon'
import { Polygon } from '../polygons/visual-components'

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
`

const PositionedPolygon = styled(Polygon)`
  display: block;
  position: absolute;
  bottom: ${props => parseInt(props.size) / -2}vw;
  left: 0;
  margin: 0;
  transform: rotate(-15deg);
  transform-origin: bottom left;
`

export default () => {
  const hexagon = polygonAsClipPath(6)
  const colours = [
    '#f268ff',
    '#db75ff',
    '#c281ff',
    '#aa8fff',
    '#929cff',
    '#7aa9ff',
    '#62b6ff',
    '#49c2ff',
    '#30d0ff',
    '#18dcff',
    '#00e9ff',
  ]

  const getSize = i => 150 / colours.length * i

  return (
    <Container>
      {colours.map((colour, i) => (
        <PositionedPolygon
          key={i}
          path={hexagon}
          size={getSize(colours.length - i) + 'vw'}
          backgroundColor={colour}
        />
      ))}
    </Container>
  )
}
