import Post from '../../../config/models/Post'

export const loadPosts = async (args, context) => {
  const posts = await new Post().fetchAll({ withRelated: ['users'] })
  return posts.toJSON()
}

export const createPost = async (args, context) => {
  const posts = await new Post({
    title: args.input.title,
    description: args.input.description,
    user_id: args.input.user_id
  }).save()

  const postsWithUser = await new Post({ id: posts.attributes.id }).fetch({
    withRelated: ['users']
  })

  return postsWithUser.toJSON()
}
