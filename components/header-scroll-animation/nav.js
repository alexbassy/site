import React from 'react'
import {
  HEADER_HEIGHT,
  MINIMISED_HEADER_HEIGHT,
  PAGE_PADDING,
  BACKGROUND_COLOR
} from './constants'

class Nav extends React.Component {
  render () {
    return (
      <nav>
        <ul>
          <li data-active>All fish</li>
          <li>Where to buy</li>
          <li>Similar fish</li>
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
          li {
            margin-right: 20px;
            text-transform: uppercase;
            font-weight: 300;
            font-size: 14px;
            letter-spacing: 1px;
            color: #ffffff80;
            transition: color .2s ease;
          }
          li:hover {
            color: #fff;
          }
          li[data-active] {
            color: #fff;
            border-bottom: 1px solid #fff;
          }
        `}</style>
      </nav>
    )
  }
}

export default Nav
