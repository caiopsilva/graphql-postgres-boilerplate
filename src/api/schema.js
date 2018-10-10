import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import * as UserType from './modules/users/UserType'

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`
const typeDefs = [UserType.typeDefs]

const resolvers = merge(UserType.resolvers)

export const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers: resolvers
})
