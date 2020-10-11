import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import PolygonsExample from '../../components/polygons'

export default function PolygonsPage() {
  const router = useRouter()
  const view = router.query?.view || 'wall-of-text'

  return (
    <>
      <Head>
        <title>Polygons with CSS, SVG and Canvas / Alex Bass</title>
        <meta
          name='description'
          content='Showing the various ways to make shapes (polygons) with CSS, SVG and Canvas (JS)'
        />
      </Head>
      <PolygonsExample view={view} />
    </>
  )
}
