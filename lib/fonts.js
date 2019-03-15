// constants for use in css
export const FIRA_SANS = `'Fira Sans', --apple-system, BlinkMacSystemFont, sans-serif`
export const ROBOTO_MONO = `'Roboto Mono', monospace`

const FontTag = ({ href }) => (
  <link href={href} rel='stylesheet' crossOrigin='anonymous' />
)

export const FiraSansFont = () => (
  <FontTag href='https://fonts.googleapis.com/css?family=Fira+Sans:400,700' />
)

export const RobotoMonoFont = () => (
  <FontTag href='https://fonts.googleapis.com/css?family=Roboto+Mono:400,700' />
)
