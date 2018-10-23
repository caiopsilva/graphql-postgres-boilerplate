import * as PostLoader from './PostLoader'

export default {
  Query: {
    getPosts: (_, data, context) => PostLoader.loadPosts(data, context)
  },
  Mutation: {
    createPost: (_, data, context) => PostLoader.createPost(data, context)
  }
}
