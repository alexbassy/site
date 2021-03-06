import React, { useState } from 'react'
import { Global } from '@emotion/core'

import Menu from './menu'
import LoremIpsum from './lorem-ipsum'
import { pageStyles } from './visual-components'

const Index = () => {
  const [isMenuOpen, setOpen] = useState(false)
  return (
    <div>
      <Global styles={pageStyles} />
      <Menu isOpen={isMenuOpen} setOpen={setOpen} />
      <LoremIpsum />
    </div>
  )
}

export default Index
