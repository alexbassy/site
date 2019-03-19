import React, { useState } from 'react'
import Head from 'next/head'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import PolygonShape from './Polygon'

const pageStyles = css`
  body {
    background: #222;
  }
`

const Wrap = styled.div`
  max-width: 900px;
  font-size: 20px;
  line-height: 2;
  margin: 50px auto;
  font-family: 'ZCOOL XiaoWei', serif;
`

const LoremIpsum = styled.p`
  color: rgba(255, 255, 255, 0.7);
`

const PolygonElement = styled.div`
  margin: 20px;
  background-image: url(${props => props.backgroundImage});
  clip-path: ${props => props.shape};
  shape-outside: ${props => props.shape};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  float: ${props => props.float};
`

const Polygon = ({ backgroundImage, vertices, size, float }) => {
  const polly = new PolygonShape({ vertices, size })
  const path = polly.getPointsAsClipPath()
  return (
    <PolygonElement
      shape={path}
      size={size}
      backgroundImage={backgroundImage}
      float={float}
    />
  )
}

export default () => {
  return (
    <>
      <Global styles={pageStyles} />
      <Head>
        <link href='https://fonts.googleapis.com/css?family=ZCOOL+XiaoWei' rel='stylesheet'/>
      </Head>
      <Wrap>
        <LoremIpsum>
          <p>
            Lorem ipsum dolor amet disrupt selvage literally chia, seitan master
            cleanse brunch. Excepteur normcore waistcoat ethical sint, keffiyeh
            portland. Authentic kickstarter gentrify biodiesel knausgaard
            freegan. Nisi succulents vaporware ut quinoa actually. Bicycle
            rights jianbing proident, trust fund poke laboris pitchfork
            adaptogen.
          </p>

          <Polygon
            vertices={12}
            size={220}
            backgroundImage='https://source.unsplash.com/QwoNAhbmLLo/220x220'
            float='left'
          />

          <p>
            Farm-to-table humblebrag pour-over pabst normcore +1. Try-hard
            pariatur reprehenderit in wayfarers tote bag pork belly. Et selvage
            drinking vinegar mlkshk pop-up sriracha taxidermy bitters snackwave
            locavore. Vape enim jean shorts bespoke cred blue bottle.
          </p>

          <p>
            Poke lumbersexual green juice mustache. Pop-up commodo brunch small
            batch pickled. Knausgaard shaman gluten-free enamel pin duis
            slow-carb. Kale chips roof party mumblecore bespoke blog VHS.
            Schlitz consequat kinfolk magna. Live-edge raw denim minim DIY
            nostrud laboris.
          </p>

          <p>
            Mumblecore lomo hexagon velit meh magna. Skateboard blog ramps
            proident affogato deep v chartreuse biodiesel typewriter flannel.
            Blue bottle flannel normcore semiotics cred, butcher selfies veniam
            kitsch coloring book tumeric cronut. Proident leggings semiotics pok
            pok selfies pug dolore fingerstache sustainable sint selvage
            gastropub bicycle rights brooklyn pour-over. Flexitarian prism
            williamsburg, ugh neutra direct trade pork belly.
          </p>

          <Polygon
            vertices={10}
            size={350}
            backgroundImage='https://source.unsplash.com/WLUHO9A_xik/350x350'
            float='right'
          />

          <p>
            Fashion axe waistcoat mlkshk wayfarers glossier. Seitan enamel pin
            crucifix, literally salvia plaid succulents four loko ipsum. Paleo
            mustache activated charcoal, art party authentic street art wolf
            live-edge cronut sed iPhone typewriter. Try-hard vinyl crucifix
            freegan flexitarian health goth velit pug. Vegan 3 wolf moon cred
            yuccie mustache four dollar toast lo-fi pop-up unicorn thundercats
            etsy polaroid velit intelligentsia snackwave. Trust fund
            reprehenderit tattooed, tote bag art party actually pop-up vinyl
            bitters dolore kale chips ea scenester flexitarian seitan.
          </p>

          <p>
            Hot chicken fixie fugiat YOLO unicorn, eu banjo. Sriracha tofu
            occaecat poke copper mug jianbing. Do occupy palo santo, laborum man
            bun kombucha iceland echo park aesthetic roof party. Non quis
            excepteur cred, chillwave iceland velit officia chartreuse. Raw
            denim selfies locavore ethical forage brunch. Taiyaki adipisicing
            nisi synth crucifix, lomo tofu disrupt letterpress pabst.
          </p>

          <Polygon
            vertices={8}
            size={180}
            backgroundImage='https://source.unsplash.com/H5PnIYI_1I0/300x300'
            float='left'
          />

          <p>
            Sint live-edge chambray truffaut mustache offal. Snackwave ullamco
            cronut whatever, disrupt man bun brunch banh mi green juice
            gochujang est. Skateboard fanny pack brooklyn waistcoat pinterest
            taiyaki austin kinfolk narwhal hexagon beard green juice. Enamel pin
            tacos scenester tumblr cloud bread raclette helvetica forage
            eiusmod. Tousled meh est aute tattooed, irure pabst pinterest
            taxidermy lo-fi. Humblebrag bitters consectetur roof party do
            activated charcoal bespoke taxidermy post-ironic in ugh dolor blog.
            Kickstarter tofu crucifix four loko, listicle XOXO bushwick migas
            mumblecore locavore salvia 3 wolf moon.
          </p>

          <p>
            Gluten-free master cleanse plaid ennui, pabst sint gastropub officia
            live-edge taxidermy. Kickstarter taxidermy quinoa, glossier plaid
            retro microdosing +1 occaecat fam dreamcatcher mlkshk echo park
            leggings gluten-free. Tousled ullamco pour-over, fam etsy man bun
            tofu vape dreamcatcher intelligentsia woke deep v. Health goth
            aesthetic single-origin coffee street art art party.
          </p>

          <Polygon
            vertices={9}
            size={300}
            backgroundImage='https://source.unsplash.com/5NE6mX0WVfQ/300x300'
            float='right'
          />

          <p>
            Shabby chic magna edison bulb YOLO, tumeric brooklyn keffiyeh
            listicle. Officia la croix brunch mustache celiac qui iPhone
            knausgaard tote bag. Butcher jianbing kinfolk coloring book
            scenester cloud bread. Est franzen flexitarian cronut dolor pabst
            tilde tofu vegan sint post-ironic truffaut. Lo-fi bicycle rights
            drinking vinegar typewriter, consequat authentic glossier twee
            shaman snackwave forage austin DIY proident single-origin coffee.
            90's unicorn next level bespoke aliqua succulents pitchfork
            dreamcatcher nulla tempor post-ironic yuccie viral.
          </p>

          <p>
            Dolor listicle adaptogen iceland mustache cornhole shabby chic
            cupidatat vinyl master cleanse. Hashtag brooklyn literally,
            cold-pressed keffiyeh prism portland put a bird on it narwhal
            letterpress gluten-free street art forage mollit actually. Ex af
            flannel ullamco. Pinterest aesthetic laboris, poutine exercitation
            lumbersexual qui ugh nulla typewriter live-edge mlkshk.
          </p>

        </LoremIpsum>
      </Wrap>
    </>
  )
}
