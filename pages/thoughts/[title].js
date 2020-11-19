import React from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import BackLink from '../../components/BackLink'
import getPosts from '../../lib/getPosts'

const ContentWrap = styled.div`
  max-width: 60ch;
  margin: 2rem auto;
`

const Content = styled.main`
  font-family: 'Merriweather', serif;
  line-height: 1.8;
  font-size: 18px;
`

const Published = styled.div`
  margin-top: 2rem;
  font-size: 80%;
  color: rgb(100 100 100);
`

const CodeBlock = styled.pre`
  font-size: 85%;
  margin: 2rem -2rem;
  padding: 1rem;
  overflow-x: auto;
  box-shadow: 0 1px 8px rgb(0 0 0 / 10%);
  border-radius: 8px;
`

const Post = props => {
  const parsedPost = unified()
    .use(parse)
    .use(remark2react, {
      remarkReactComponents: {
        pre: CodeBlock,
      },
    })
    .processSync(props.post.body).result

  const wordCount = props.post.body.split(' ').length

  return (
    <>
      <Head>
        <title>{props.post.title} / Alex Bass</title>
        <link
          href='https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <ContentWrap>
        <BackLink invert />
        <Content>
          <Published>
            Written{' '}
            <time dateTime={props.post.published}>
              {props.post.publishedFormatted}
            </time>{' '}
            in Berlin • {wordCount} words
          </Published>
          {parsedPost}
        </Content>
      </ContentWrap>
    </>
  )
}

export default Post

export async function getStaticProps(context) {
  const posts = await getPosts()
  const single = posts.find(({ slug }) => context.params.title === slug)

  return {
    props: {
      post: single,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ slug }) => ({
      params: { title: slug },
    })),
    fallback: false,
  }
}
