import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import UserResolvers from './modules/users/UserResolvers'
import PostResolvers from './modules/posts/PostResolvers'
import PostType from './modules/posts/PostType'
import UserType from './modules/users/UserType'

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const typeDefs = [PostType, UserType]

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers: merge(UserResolvers, PostResolvers)
})
