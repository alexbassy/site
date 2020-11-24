import React from 'react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import IsoLink from 'next-isomorphic-link'
import BackLink from '../../components/BackLink'
import getPosts from '../../lib/getPosts'

const Content = styled.main`
  padding: 20px var(--margin);
  text-align: center;

  @media screen and (min-width: 500px) {
    text-align: left;
  }
`

const Title = styled.h1`
  color: #fff;
  font-weight: 400;

  @media screen and (max-width: 500px) {
    margin-top: var(--margin);
  }
`

const Subtitle = styled.h2`
  color: #ffffff80;
  font-weight: 100;
  font-size: 20px;
  margin: 0 0 40px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  border-left: 3px solid rgb(255 255 255 / 0.5);
  padding-left: 1rem;
  margin-bottom: 2rem;
`

const PostTitle = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0.25rem 0;
`

const PostPublishDate = styled.time`
  color: rgb(255 255 255 / 0.8);
`

const PostLink = styled.a`
  color: #fff;
  cursor: pointer;
`

const ThoughtsPage = props => (
  <div>
    <Head>
      <title>Thoughts / Alex Bass</title>
    </Head>
    <Global
      styles={{
        body: {
          backgroundColor: '#000',
        },
      }}
    />
    <Content>
      <BackLink />
      <Title>Thoughts</Title>
      <Subtitle>Not succinct enough to call a blog.</Subtitle>
      <List>
        {props.posts.map(post => {
          return (
            <ListItem key={post.slug}>
              <PostTitle>
                <IsoLink href={`/thoughts/${post.slug}`}>
                  <PostLink>{post.title}</PostLink>
                </IsoLink>{' '}
              </PostTitle>
              <PostPublishDate datetime={post.published}>
                {post.publishedFormatted}
              </PostPublishDate>
            </ListItem>
          )
        })}
      </List>
    </Content>
  </div>
)

export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default ThoughtsPage
