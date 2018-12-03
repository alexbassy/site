import Link from 'next/link'
import styled from '@emotion/styled'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: var(--margin) 0;
`

const Item = styled.li`
  display: inline-block;
  margin-right: 1rem;
`

const LinkButton = styled.a`
  font-weight: 100;
  text-decoration: none;
  color: #fff;
  border: 2px solid var(--linksDimmed);
  padding: 2px 6px;
  transition: border-color .2s ease, color .15s ease;

  :visited {
    color: #fff;
  }

  :active {
    color: #ffffffaa;
  }

  :hover {
    border-color: #ffffffaa;
  }
`

const links = [
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alex-bass-56a28761/',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/alexbassy',
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/alexbassy',
  },
  {
    label: 'Playground',
    path: 'playground',
  }
]

export default () => (
  <List>
    {links.map(({ label, url, path }) => (
      <Item key={label}>
        {url
          ? (
            <LinkButton href={url} rel='noopener'>
              {label}
            </LinkButton>
          )
          : (
            <Link href={path}>
              <LinkButton href={path}>
                {label}
              </LinkButton>
            </Link>
          )}
      </Item>
    ))}
  </List>
)
