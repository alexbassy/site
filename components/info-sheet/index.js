import React, { useState } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'

import MobileViewport from './MobileViewport'
import InfoSheet from './InfoSheet'
import { pageStyles, Page, Title, Subtitle, Button } from './visual-components'

function InfoSheetPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileViewportEnabled, setIsMobileViewportEnabled] = useState(false)
  const [activeContent, setActiveContent] = useState('initialState')
  const handleCheckboxChange = event =>
    setIsMobileViewportEnabled(event.target.checked)
  const content = {
    one: `I am some fresh content ⚡️`,
    two: `I too, am fresh content 🔥`,
  }

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/css?family=Fira+Sans&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Global styles={pageStyles} />
      <MobileViewport enabled={isMobileViewportEnabled}>
        <Page>
          <Title>Info Sheet</Title>
          <p>
            <label>
              <input
                type='checkbox'
                checked={isMobileViewportEnabled}
                onChange={handleCheckboxChange}
              />{' '}
              Enable mobile viewport
            </label>
          </p>
          <Subtitle>👆 Tap the button to open the info sheet</Subtitle>
          <Subtitle>🌒 Drag down, or tap the underlay to close</Subtitle>
          <Button
            onClick={() => {
              setActiveContent('one')
              setIsOpen(true)
            }}
          >
            Open Info Sheet
          </Button>{' '}
          <Button
            onClick={() => {
              setActiveContent('two')
              setIsOpen(true)
            }}
          >
            Open a different Info Sheet
          </Button>
        </Page>
        <InfoSheet open={isOpen} onClose={() => setIsOpen(false)}>
          {content[activeContent]}
        </InfoSheet>
      </MobileViewport>
    </>
  )
}

export default InfoSheetPage
