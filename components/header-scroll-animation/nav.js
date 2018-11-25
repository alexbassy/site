import React from 'react'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  BACKGROUND_COLOR
} from './constants'

const Tab = ({ id, children, active, onClick }) => {
  return (
    <li>
      <button onClick={() => onClick(id)}>{children}</button>
      <style jsx>{`
        li {
          margin-right: 20px;
          text-transform: uppercase;
          font-weight: 300;
          font-size: 14px;
          letter-spacing: 1px;
          color: #ffffff${active ? 'ff' : '80'};
          box-shadow: ${active ? `0 1px #fff` : '0 4px #ffffff00'};
          transition: color .2s ease, box-shadow .2s ease;
        }
        li:hover {
          color: #fff;
        }
        button {
          all: unset;
          cursor: pointer;
        }
      `}</style>
    </li>
  )
}

class Nav extends React.PureComponent {
  state = {
    activeTab: 0
  }

  setActiveTab = activeTab => this.setState({ activeTab })

  render () {
    const { activeTab } = this.state
    return (
      <nav>
        <ul>
          {['All Fish', 'Where to Buy', 'Similar Fish'].map((name, i) => (
            <Tab
              key={name}
              id={i}
              active={activeTab === i}
              onClick={this.setActiveTab}
            >
              {name}
            </Tab>
          ))}
        </ul>
        <style jsx>{`
          nav {
            position: sticky;
            margin-top: ${HEADER_HEIGHT}px;
            top: ${MINIMISED_HEADER_HEIGHT}px;
            padding: 0 ${PAGE_PADDING}px;
            background: ${BACKGROUND_COLOR};
          }
          ul {
            display: flex;
            padding: 0;
            list-style: none;
          }
        `}</style>
      </nav>
    )
  }
}

export default Nav
