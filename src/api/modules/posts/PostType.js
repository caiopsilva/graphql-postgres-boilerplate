import * as PostLoader from './PostLoader'

const postAttribs = `
    id: ID!
    title: String
    content: String!
    author: User!
`

export const typeDefs = `
    type Post {
        ${postAttribs}
    }

    type Query {
        getPosts: Post
    }

    input PostInput {
        ${postAttribs}
    }

    type Mutation {
        createPost(input: PostInput): Post
    }

`

export const resolvers = {
  Query: {
    getPosts: (_, data, context) => PostLoader.loadPosts(data, context)
  },
  Mutation: {
    createPost: (_, data, context) => PostLoader.createPost(data, context)
  }
}
