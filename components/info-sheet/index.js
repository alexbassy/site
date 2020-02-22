import React, { useState } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'

import MobileViewport from './MobileViewport'
import InfoSheet from './InfoSheet'
import { pageStyles, Page, Title, Subtitle, Button } from './visual-components'
import useViewportSize from '../../hooks/useViewportSize'

function InfoSheetPage() {
  const { w } = useViewportSize()
  const isProbablyDesktop = w > 720
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileViewportEnabled, setIsMobileViewportEnabled] = useState(false)
  const [activeContent, setActiveContent] = useState()
  const handleViewportEmulatorCheckboxChange = event =>
    setIsMobileViewportEnabled(event.target.checked)
  const showContent = which => () => {
    setActiveContent(which)
    setIsOpen(true)
  }

  // Hit the like button and subscribe
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
          {isProbablyDesktop && (
            // Show viewport emulator toggle
            // when not on a mobile device
            <p>
              <label>
                <input
                  type='checkbox'
                  checked={isMobileViewportEnabled}
                  onChange={handleViewportEmulatorCheckboxChange}
                />{' '}
                Toggle mobile viewport
              </label>
            </p>
          )}
          <Subtitle>👆 Tap the button to open the info sheet</Subtitle>
          <Subtitle>🌒 Drag down, or tap the underlay to close</Subtitle>
          <p>
            <Button onClick={showContent('one')}>Open Info Sheet</Button>
          </p>
          <p>
            <Button onClick={showContent('two')}>
              Open a different Info Sheet
            </Button>
          </p>
        </Page>
        <InfoSheet open={isOpen} onClose={() => setIsOpen(false)}>
          {content[activeContent]}
        </InfoSheet>
      </MobileViewport>
    </>
  )
}

export default InfoSheetPage
