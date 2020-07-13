import App from 'next/app'
import Router from 'next/router'

import * as gtag from '../lib/gtag'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export function reportWebVitals({ id, name, label, value }) {
  gtag.event({
    action: name,
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    nonInteraction: true, // avoids affecting bounce rate.
  })
}

export default App
