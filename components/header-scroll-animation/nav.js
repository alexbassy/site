import React from 'react'
import styled from '@emotion/styled'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  BACKGROUND_COLOR
} from './constants'

const Container = styled.nav`
  position: sticky;
  margin-top: ${HEADER_HEIGHT}px;
  top: ${MINIMISED_HEADER_HEIGHT}px;
  padding: 0 ${PAGE_PADDING}px;
  background: ${BACKGROUND_COLOR};
  white-space: nowrap;
  overflow-x: auto;
`

const TabList = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
`

const TabItem = styled.li`
  font-size: 14px;
  margin-right: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 300;
  color: rgba(255, 255, 255, ${props => props.active ? 1 : .65});
  box-shadow: ${props => props.active ? `0 1px #fff` : '0 4px rgba(255, 255, 255, 0)'};
  transition: color .2s ease, box-shadow .2s ease;

  :hover {
    color: #fff;
  }
`

const TabButton = styled.button`
  all: unset;
  cursor: pointer;
`

const Tab = ({ id, children, active, onClick }) => {
  return (
    <TabItem active={active}>
      <TabButton onClick={() => onClick(id)}>
        {children}
      </TabButton>
    </TabItem>
  )
}

class Nav extends React.PureComponent {
  state = {
    activeTab: 0
  }

  setActiveTab = activeTab => this.setState({ activeTab })

  render () {
    return (
      <Container>
        <TabList>
          {['All Fish', 'Where to Buy', 'Similar Fish'].map((name, i) => (
            <Tab
              key={name}
              id={i}
              active={this.state.activeTab === i}
              onClick={this.setActiveTab}
            >
              {name}
            </Tab>
          ))}
        </TabList>
      </Container>
    )
  }
}

export default Nav
