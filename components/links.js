import Link from 'next/link'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0 0 20px;
`

const Item = styled.li`
  display: inline-block;
  margin-right: 1rem;
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
  <Container>
    <List>
      {links.map(({ label, url, path }) => (
        <Item key={label}>
          {url
            ? <a href={url} rel='noopener'>{label}</a>
            : <Link href={path}><a>{label}</a></Link>}
        </Item>
      ))}
    </List>
  </Container>
)
