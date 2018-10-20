import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import * as UserType from './modules/users/UserType'
import * as PostType from './modules/posts/PostType'

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`

const typeDefs = [UserType.typeDefs, PostType.typeDefs]

// const resolvers = merge(UserType.resolvers, PostType.resolvers)

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers: merge(UserType.resolvers, PostType.resolvers)
})
