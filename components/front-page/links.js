import Link from 'next/link'
import styled from '@emotion/styled'

import linkedinIcon from './icons/linkedin'
import githubIcon from './icons/github'
import twitterIcon from './icons/twitter'

const Nav = styled.nav`
  position: relative;
`

const buttonStyles = {
  r: {
    bg: '#e80000',
    text: '#ffffff',
  },
  g: {
    bg: '#68f600',
    text: '#0b4e00',
  },
  b: {
    bg: '#0067ff',
    text: '#ffffff',
  },
}

const List = styled.ul`
  display: flex;
  list-style: none;
  margin-top: 24px;
  padding-left: 0;

  @media screen and (max-width: 640px) {
    flex-wrap: wrap;
    align-items: stretch;
    max-width: 270px;
    margin: 15px auto 0;
  }
`

const Item = styled.li`
  display: inline-block;
  margin-right: 20px;

  @media screen and (max-width: 640px) {
    flex: 1 0 calc(50% - 15px);
    margin: var(--margin) 0 0;

    :nth-of-type(odd) {
      margin-right: 15px;
    }
  }
`

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  text-decoration: none;
  background-color: ${props => props.style.bg};
  color: ${props => props.style.text};
  border-radius: 30px;
  transition: color 0.15s ease;

  :visited {
    color: ${props => props.style.text};
  }

  :active {
    color: ${props => props.style.text}aa;
  }

  :hover {
    color: ${props => props.style.text};
  }

  svg {
    width: 22px;
    height: 22px;
  }

  svg path {
    fill: currentColor;
  }
`

const links = [
  {
    label: 'LinkedIn',
    icon: linkedinIcon,
    url: 'https://www.linkedin.com/in/alex-bass-56a28761/',
    style: buttonStyles.r,
  },
  {
    label: 'GitHub',
    icon: githubIcon,
    url: 'https://github.com/alexbassy',
    style: buttonStyles.g,
  },
  {
    label: 'Twitter',
    icon: twitterIcon,
    url: 'https://twitter.com/alexbassy',
    style: buttonStyles.b,
  },
]

export default () => (
  <Nav>
    <List>
      {links.map(({ label, icon, url, path, style }) => (
        <Item key={label}>
          {url ? (
            <LinkButton
              style={style}
              href={url}
              rel='noopener'
              title={label}
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          ) : (
            <Link href={path}>
              <LinkButton
                style={style}
                href={path}
                title={label}
                dangerouslySetInnerHTML={{ __html: icon }}
              />
            </Link>
          )}
        </Item>
      ))}
    </List>
  </Nav>
)
