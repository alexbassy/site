import React from 'react'
import Head from 'next/head'

const ResponsiveImages = () => (
  <main>
    <Head>
      <title>iOS/Spotify style header animation / Alex Bass</title>
    </Head>
    <style jsx>{`
      main {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 100px;
        height: 100px;
      }
      @media (min-width: 768px) {
        img {
          width: 200px;
          height: 200px;
        }
      }
      @media (min-width: 1200px) {
        img {
          width: 300px;
          height: 300px;
        }
      }
      @media (max-height: 300px) {
        img {
          width: 200px;
          height: 200px;
        }
      }
      p {
        font-size: 14px;
        color: #00000070;
        max-width: 50ch;
        text-align: center;
      }
    `}</style>
    <img
      src='https://via.placeholder.com/100'
      srcSet=' https://via.placeholder.com/100 100w,
      https://via.placeholder.com/200 200w,
      https://via.placeholder.com/400 400w,
      https://via.placeholder.com/600 600w'
      sizes='(min-width: 1200px) 300px,
             (min-width: 768px)  200px,
             100px'
    />
    <div>
      <p>
        To see images change, open inspector, disable cache, and resize the page
      </p>
    </div>
  </main>
)

export default ResponsiveImages
