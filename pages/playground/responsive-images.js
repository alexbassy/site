import React from 'react'
import Head from 'next/head'

const ResponsiveImages = () => (
  <main>
    <Head>
      <title>iOS/Spotify style header animation / Alex Bass</title>
    </Head>
    <style jsx>{`
      main {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: radial-gradient(
          circle at bottom left,
          rgb(88 35 10),
          rgb(84 4 74)
        );
      }
      img {
        width: 100px;
        height: 100px;
        filter: invert(1) brightness(0.5);
        border-radius: 8px;
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
        color: #fff;
        max-width: 50ch;
        text-align: center;
        margin: 2rem 0;
      }
    `}</style>
    <div>
      <p>
        This is a <i>_simple_</i> reference for loading differently sized images
        for various viewports using the browser `srcSet` attribute paired with
        the `sizes` attribute.
      </p>
    </div>
    <img
      className='responsive-image'
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
        The browser will automatically load the best, lowest resolution for the
        current viewport and pixel density. The goal is highest fidelity with
        lowest file size.
      </p>
      <p>
        To see images change, open inspector, disable cache, and resize the page
      </p>
    </div>
  </main>
)

export default ResponsiveImages
