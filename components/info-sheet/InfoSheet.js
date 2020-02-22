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

function InfoSheet(props) {
  const handleDragEnd = useCallback((event, info) => {
    if (info.offset.y > 180) props.onClose()
  })

  return (
    <AnimatePresence>
      {props.open && (
        <>
          <Global styles={stopScroll} />
          <InfoSheetCurtain
            variants={infoSheetCurtainStates}
            initial='hidden'
            animate='visible'
            exit='hidden'
            onClick={() => props.onClose()}
          />
          <InfoSheetContainer
            variants={infoSheetStates}
            initial='hidden'
            exit='hidden'
            animate='visible'
            drag='y'
            dragConstraints={{ bottom: 0, top: 0 }}
            onDragEnd={handleDragEnd}
          >
            Info sheet fresh content
          </InfoSheetContainer>
        </>
      )}
    </AnimatePresence>
  )
}

export default InfoSheet
