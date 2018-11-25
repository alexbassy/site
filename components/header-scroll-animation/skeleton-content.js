import React from 'react'
import { PAGE_PADDING } from './constants'

const SkeletonContentItem = (props) => {
  return (
    <li>
      <div data-id='avatar'></div>
      <div data-id='fakename'></div>
      <div data-id='fakealbum'></div>
      <style jsx>{`
      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #ffffff20;
        padding: 0 ${PAGE_PADDING}px;
      }
      [data-id=avatar] {
        flex: 0 0 24px;
        width: 24px;
        height: 24px;
        border-radius: 32px;
        margin-right: 20px;
        background: #ffffff20;
      }
      [data-id=fakename],
      [data-id=fakealbum] {
        flex: 1;
        background: #ffffff20;
        height: 14px;
      }
      [data-id=fakename] {
        margin-right: 20px;
      }
      `}</style>
    </li>
  )
}

const SkeletonContent = (props) => {
  return (
    <div>
      <ul>
        {[...Array(50).keys()].map(k =>
          <SkeletonContentItem key={k} />)}
      </ul>
      <style jsx>{`
        ul {padding: 0}
      `}</style>
    </div>
  )
}

export default SkeletonContent
