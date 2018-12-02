import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import getConfig from 'next/config'

const ASSET_PREFIX = getConfig().publicRuntimeConfig.assetPrefix


const links = [
  {
    icon: `📸`,
    path: 'responsive-images',
    label: 'HTML/CSS only responsive, HiDPI friendly images with `srcset` and `sizes` attributes'
  },
  {
    icon: `🍿`,
    path: 'header-scroll-animation',
    label: 'iOS header scrolling animation, and header item staggered animation ala Spotify'
  }
]

const ListItem = ({ icon, path, label }) => (
  <li>
    <style jsx>{`
    li {
      position: relative;
      max-width: 50ch;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      list-style: none;
    }
    li:before {
      content: '${icon}';
      position: absolute;
      margin-left: -2rem;
    }
  `}</style>
    <Link href={`${ASSET_PREFIX}/playground/${path}`}>
      <a>{label}</a>
    </Link>
  </li>
)

export default () => (
  <div>
    <Head>
      <title>Playground / Alex Bass</title>
    </Head>
    <style jsx>{`
      main {
        margin: 0 2rem;
      }
    `}</style>
    <main>
      <h1>
        Stuff
      </h1>
      <ul>
        {links.map(link =>
          <ListItem key={link.path} {...link} />)}
      </ul>
    </main>
  </div>
)
