import * as UserLoader from './UserLoader'

const usersAttribs = `
    id: ID
    name: String!
    email: String!
    password: String!
`

export const typeDefs = `

    type User {
        ${usersAttribs}
    }

    type UserWithoutPassword {
        id: ID
        name: String!
        email: String!
    }

    type AuthPayload {
        token: String
        user: User
    }

    input Search {
      limit: Int
      offset: Int
      text: String
    }

    type Query {
        getUser(id: ID!): UserWithoutPassword
        getUsers(q: Search): [UserWithoutPassword]
    }

    input UserInput {
        ${usersAttribs}
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type Mutation {
        createUser(input: UserInput): User
        deleteUser(id: ID!): User
        updateUser(input: UserInput): User
        login(input: LoginInput): AuthPayload
    }
`

export const resolvers = {
  Query: {
    getUsers: (_, data, context) => UserLoader.loadUsers(data, context),
    getUser: (_, data, context) => UserLoader.loadUser(data, context)
  },
  Mutation: {
    createUser: (_, data, context) => UserLoader.createUser(data, context),
    updateUser: (_, data, context) => UserLoader.updateUser(data, context),
    deleteUser: (_, data, context) => UserLoader.deleteUser(data, context),
    login: (_, data, context) => UserLoader.login(data, context)
  }
}
