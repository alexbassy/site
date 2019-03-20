import React from 'react'
import Head from 'next/head'
import PolygonsExample from '../../components/polygons'

const PolygonsPage = ({ query }) => (
  <>
    <Head>
      <title>Polygons with CSS, SVG and Canvas / Alex Bass</title>
      <meta name='description' content='Showing the various ways to make shapes (polygons) with CSS, SVG and Canvas (JS)' />
    </Head>
    <PolygonsExample view={query.view} />
  </>
)

PolygonsPage.getInitialProps = async ({ query }) => {
  return { query }
}

export default PolygonsPage