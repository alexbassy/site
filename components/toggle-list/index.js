import React, { useState } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'

import {
  pageStyles,
  Page,
  Title,
  Columns,
  Column,
  Placeholder,
  ListContainer,
  ListItem,
  AnimatedListItem,
} from './visual-components'
import useViewportSize from '../../hooks/useViewportSize'

function ToggleListPage() {
  const [areMoreItemsShown, setAreMoreItemsShown] = useState(false)
  const { w } = useViewportSize()
  const isProbablyDesktop = w > 720

  const listItemVariants = {
    adding: { opacity: 0, scale: 1.1 },
    added: { opacity: 1, scale: 1 },
    removed: { opacity: 0, scale: 0 },
  }

  const listItemProps = {
    variants: listItemVariants,
    initial: 'adding',
    animate: 'added',
    exit: 'removed',
    transition: { duration: 1 },
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
      <Page>
        <Title>Toggle List</Title>
        <AnimateSharedLayout>
          <Columns>
            <Column>
              <ListContainer layout>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <AnimatePresence transition={{ staggerChildren: 0.3 }}>
                  {!areMoreItemsShown ? null : (
                    <motion.li transition={{ staggerChildren: 0.3 }}>
                      <AnimatedListItem key='a' {...listItemProps} />
                      <AnimatedListItem key='b' {...listItemProps} />
                      <AnimatedListItem key='c' {...listItemProps} />
                    </motion.li>
                  )}
                  <AnimatedListItem
                    key='add'
                    onClick={() => setAreMoreItemsShown(!areMoreItemsShown)}
                  >
                    Show more
                  </AnimatedListItem>
                </AnimatePresence>
              </ListContainer>
              <Placeholder height={10} layout>
                <ListItem unimportant />
                <ListItem unimportant />
              </Placeholder>
            </Column>
            <Column>
              <Placeholder height={5} layout>
                <ListItem unimportant />
              </Placeholder>
              <Placeholder height={10} layout>
                <ListItem unimportant />
                <ListItem unimportant />
                <ListItem unimportant />
              </Placeholder>
            </Column>
          </Columns>
        </AnimateSharedLayout>
      </Page>
    </>
  )
}

export default ToggleListPage
