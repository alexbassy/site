import React from 'react'
import { useRouter } from 'next/router'
import getPosts from '../../lib/getPosts'

const Post = props => {
  return <p>Post: {props.body}</p>
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
    paths: posts.map(({ fileName, slug }) => ({
      params: { title: slug },
    })),
    fallback: false,
  }
}
