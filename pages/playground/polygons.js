import React from 'react'
import Head from 'next/head'
import PolygonsExample from '../../components/polygons'

const PolygonsPage = ({ view }) => (
  <>
    <Head>
      <title>Polygons with CSS, SVG and Canvas / Alex Bass</title>
      <meta name='description' content='Showing the various ways to make shapes (polygons) with CSS, SVG and Canvas (JS)' />
    </Head>
    <PolygonsExample view={view} />
  </>
)

PolygonsPage.getInitialProps = async ({ query }) => {
  const view = query.view || 'generator'
  return { view }
}

export default PolygonsPage