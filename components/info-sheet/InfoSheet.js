import React, { useCallback, useEffect, useRef } from 'react'
import { Global } from '@emotion/core'
import { AnimatePresence } from 'framer-motion'
import VisuallyHidden from '../VisuallyHidden'
import {
  stopScroll,
  InfoSheetContainer,
  InfoSheetCurtain,
} from './visual-components'

const infoSheetStates = {
  visible: { y: '0%', opacity: 1 },
  hidden: { y: '100%', opacity: 0 },
}

const infoSheetCurtainStates = {
  visible: { opacity: 0.5 },
  hidden: { opacity: 0 },
}

function InfoSheet({ onClose, open, children }) {
  const closeButton = useRef()
  const previouslyFocussedElement = useRef()

  // Trap the focus when the info sheet is opened, and
  // restore focus to the previously focussed element
  // then the sheet is closed.
  useEffect(() => {
    if (open) previouslyFocussedElement.current = document.activeElement
  }, [open])
  const focusCloseButton = () => closeButton.current.focus()
  const refocusPreviouslyFocussedElement = () =>
    previouslyFocussedElement.current.focus()

  // Close the info sheet when it’s dragged down
  // more than 120px
  const handleDragEnd = useCallback(
    (_, info) => info.offset.y > 120 && onClose(),
    [onClose]
  )

  return (
    <AnimatePresence onExitComplete={refocusPreviouslyFocussedElement}>
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
            tabIndex='-1'
            aria-modal
            variants={infoSheetStates}
            initial='hidden'
            exit='hidden'
            animate='visible'
            drag='y'
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            onAnimationComplete={focusCloseButton}
          >
            <VisuallyHidden>
              {/* Provide a way for screen reader users to close the info sheet */}
              <button ref={closeButton} onClick={onClose}>
                Close Info Sheet
              </button>
            </VisuallyHidden>
            {children}
          </InfoSheetContainer>
        </>
      )}
    </AnimatePresence>
  )
}

export default InfoSheet
