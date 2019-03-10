import React, { Component } from 'react'
import { Global } from '@emotion/core'

import LoremIpsum from './lorem-ipsum'
import { pageStyles, PageContent } from './visual-components';


export default class SlidyMenu extends Component {
  render() {
    return (
      <div>
        <Global styles={pageStyles} />
        <PageContent>
          <LoremIpsum/>
        </PageContent>
      </div>
    )
  }
}
