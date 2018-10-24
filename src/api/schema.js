import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import UserResolvers from './modules/users/UserResolvers'
import PostResolvers from './modules/posts/PostResolvers'
import PostType from './modules/posts/PostType'

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, PostType],
  resolvers: merge(UserResolvers, PostResolvers)
})
