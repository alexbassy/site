import React from 'react'
import { Paragraph } from './visual-components'

function HipsterIpsum({ first, second }) {
  return (
    <>
      {first && (
        <Paragraph>
          Mustache quinoa gentrify tousled, forage tumeric mumblecore chillwave
          selvage irony aesthetic. Cliche kogi succulents squid, raclette plaid
          brooklyn +1 aesthetic. Photo booth cloud bread brunch vice organic
          hashtag pinterest next level drinking vinegar butcher post-ironic
          edison bulb. Crucifix 90’s ugh iPhone, master cleanse readymade
          microdosing bitters.
        </Paragraph>
      )}

      {second && (
        <Paragraph>
          Next level letterpress four dollar toast, asymmetrical hammock
          leggings austin viral actually church-key. Tilde cornhole pop-up hell
          of locavore, mlkshk truffaut. Cold-pressed narwhal microdosing echo
          park tumeric. Chartreuse locavore brooklyn, meditation keytar vape art
          party single-origin coffee tumblr vice.
        </Paragraph>
      )}
    </>
  )
}

export default HipsterIpsum
