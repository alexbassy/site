import React, { useState } from 'react'
import { Global } from '@emotion/core'

import InfoSheet from './InfoSheet'
import { pageStyles, Page, Button } from './visual-components'

export default () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Page>
      <Global styles={pageStyles} />
      <Button onClick={() => setIsOpen(true)}>Open Info Sheet</Button>
      <InfoSheet open={isOpen} onClose={() => setIsOpen(false)} />
    </Page>
  )
}
