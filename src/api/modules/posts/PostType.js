import * as PostLoader from './PostLoader'

const postAttribs = `
    id: ID
    title: String
    description: String!
`

export const typeDefs = `
    type Post {
        ${postAttribs}
        user: User
    }

    extend type Query {
        getPosts: Post
    }

    input PostInput {
        ${postAttribs}
        user_id: ID!
    }

    extend type Mutation {
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
