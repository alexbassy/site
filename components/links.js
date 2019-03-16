import Link from 'next/link'
import styled from '@emotion/styled'

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
  margin-top: 30px;
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
  margin-right: 1rem;

  @media screen and (max-width: 640px) {
    flex: 1 0 calc(50% - 15px);
    margin: var(--margin) 0 0;

    :nth-of-type(odd) {
      margin-right: 15px;
    }
  }
`

const LinkButton = styled.a`
  display: block;
  text-align: center;
  font-weight: 100;
  text-decoration: none;
  background-color: ${props => props.style.bg};
  color: ${props => props.style.text};
  border-radius: 30px;
  padding: 6px;
  transition: border-color 0.2s ease, color 0.15s ease;

  :visited {
    color: ${props => props.style.text};
  }

  :active {
    color: ${props => props.style.text}aa;
  }

  :hover {
    color: ${props => props.style.text};
  }

  @media screen and (min-width: 640px) {
    padding: 6px 16px;
  }
`

const links = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alex-bass-56a28761/',
    style: buttonStyles.r,
  },
  {
    label: 'GitHub',
    url: 'https://github.com/alexbassy',
    style: buttonStyles.g,
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/alexbassy',
    style: buttonStyles.b,
  },
]

export default () => (
  <Nav>
    <List>
      {links.map(({ label, url, path, style }) => (
        <Item key={label}>
          {url ? (
            <LinkButton style={style} href={url} rel='noopener'>
              {label}
            </LinkButton>
          ) : (
            <Link href={path}>
              <LinkButton style={style} href={path}>
                {label}
              </LinkButton>
            </Link>
          )}
        </Item>
      ))}
    </List>
  </Nav>
)
