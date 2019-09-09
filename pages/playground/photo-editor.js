import React from 'react'
import Head from 'next/head'
import PhotoEditor from '../../components/photo-editor'

const PhotoEditorPage = props => (
  <>
    <Head>
      <title>Photo editor interface inspired by iOS 13 / Alex Bass</title>
      <meta
        name='description'
        content='Implementing a desktop photo-editing interface which allows combining options'
      />
    </Head>
    <PhotoEditor />
  </>
)

export default PhotoEditorPage
