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
    
    type AuthPayload {
        token: String
        user: User
    }
    
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
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
    getUsers: () => UserLoader.loadUsers(),
    getUser: (_, data) => UserLoader.loadUser(data)
  },
  Mutation: {
    createUser: (_, data) => UserLoader.createUser(data),
    updateUser: (_, data) => UserLoader.updateUser(data),
    deleteUser: (_, data, ctx, a) => UserLoader.deleteUser(_, data, ctx, a),
    login: (_, data) => UserLoader.login(data)
  }
}
