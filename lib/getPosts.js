import { promises as fs } from 'fs'
import path from 'path'
import grayMatter from 'gray-matter'

const POSTS_PATH = path.resolve('posts')

export async function getMarkdownFilePaths() {
  const files = await fs.readdir(POSTS_PATH)
  return files.filter(fileName => fileName.endsWith('.md'))
}

export async function getPost(fileName) {
  const absolutePath = path.join(POSTS_PATH, fileName)
  const fileContents = await fs.readFile(absolutePath, 'utf-8')
  const { content, data } = grayMatter(fileContents)

  return {
    fileName: fileName,
    body: content,
    ...data,
  }
}

export default async function getPosts() {
  const markdownFilePaths = await getMarkdownFilePaths()
  const postPromises = markdownFilePaths.map(fileName => {
    return new Promise((resolve, reject) => {
      try {
        const post = getPost(fileName)
        resolve(post)
      } catch (e) {
        console.warn(`Failed to retrieve post “${filename}”`, e)
        reject(e)
      }
    })
  })

  return Promise.all(postPromises)
}
