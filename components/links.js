import React from 'react'
import Link from 'next-isomorphic-link'
import styled from '@emotion/styled'

const List = styled.ul`
  display: flex;
  list-style: none;
  margin-top: var(--margin);
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
  color: #fff;
  background: #000;
  border: 2px solid #ffffff40;
  padding: 6px;
  transition: border-color 0.2s ease, color 0.15s ease;

  :visited {
    color: #fff;
  }

  :active {
    color: #ffffffaa;
  }

  :hover {
    color: #fff;
    border-color: #ffffffaa;
  }

  @media screen and (min-width: 640px) {
    padding: 4px 8px;
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
  },
]

const Links = () => (
  <List>
    {links.map(({ label, url, path }) => (
      <Item key={label}>
        {url ? (
          <LinkButton href={url} rel='noopener'>
            {label}
          </LinkButton>
        ) : (
          <Link href={path}>
            <LinkButton href={path}>{label}</LinkButton>
          </Link>
        )}
      </Item>
    ))}
  </List>
)

export default Links
