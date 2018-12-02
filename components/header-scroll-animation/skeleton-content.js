import React from 'react'
import styled from '@emotion/styled'
import { PAGE_PADDING } from './constants'

const List = styled.ul`
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ffffff20;
  padding: 0 ${PAGE_PADDING}px;

  > * { margin-right: 20px; }
  > *:last-child { margin-right: 0; }
`

const Avatar = styled.div`
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  border-radius: 32px;
  background: #ffffff20;
`

const Line = styled.div`
  flex: 1;
  background: #ffffff20;
  height: 14px;
`

const SkeletonContentItem = (props) => {
  return (
    <ListItem>
      <Avatar />
      <Line />
      <Line />
    </ListItem>
  )
}

class SkeletonContent extends React.Component {
  // completely static, never rerender
  shouldComponentUpdate = () => false

  render() {
    return (
      <List>
        {[...Array(30).keys()].map(k =>
          <SkeletonContentItem key={k} />)}
      </List>
    )
  }
}

export default SkeletonContent
