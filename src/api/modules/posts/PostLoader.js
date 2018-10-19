import db from '../../../config/database'
import uuid from 'uuid'

export const loadPost = async (args, context) => {
  const posts = await db('posts')
  return posts
}

export const createPost = async (args, context) => {
  const post = await db('posts')
    .insert({
      id: uuid(),
      title: args.input.title,
      description: args.input.description,
      author: args.input.author
    })
    .returning('*')

  const user = await db('users').where('id', post[0].author).first()

  post[0].user = user

  return post[0]
}
