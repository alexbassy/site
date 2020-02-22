import React, { useCallback } from 'react'
import { Global } from '@emotion/core'
import { AnimatePresence } from 'framer-motion'
import {
  stopScroll,
  InfoSheetContainer,
  InfoSheetCurtain,
} from './visual-components'

const infoSheetStates = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: '100%', opacity: 0 },
}

const infoSheetCurtainStates = {
  visible: { opacity: 0.5 },
  hidden: { opacity: 0 },
}

function InfoSheet({ onClose, open, children }) {
  const handleDragEnd = useCallback(
    (event, info) => {
      if (info.offset.y > 180) onClose()
    },
    [onClose]
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <Global styles={stopScroll} />
          <InfoSheetCurtain
            variants={infoSheetCurtainStates}
            initial='hidden'
            animate='visible'
            exit='hidden'
            onClick={onClose}
          />
          <InfoSheetContainer
            variants={infoSheetStates}
            initial='hidden'
            exit='hidden'
            animate='visible'
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
          >
            {children}
          </InfoSheetContainer>
        </>
      )}
    </AnimatePresence>
  )
}

export default InfoSheet
