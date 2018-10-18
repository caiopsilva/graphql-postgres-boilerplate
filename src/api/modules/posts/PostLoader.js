import db from '../../../config/database'
import uuid from 'uuid'

export const loadPost = async (args, context) => {
  const championships = await db('championships')
  return championships
}

export const createPost = async (args, context) => {
  const championships = await db('championships')
    .insert({
      id: uuid(),
      title: args.title,
      description: args.description,
      author: args.author
    })
    .returning('*')

  return championships[0]
}
