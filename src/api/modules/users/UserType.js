import Post from '../posts/PostType'

const User = `
    type User {
        id: ID
        name: String!
        email: String!
        password: String!
        posts: [Post]
    }

    type UserWithoutPassword {
        id: ID
        name: String!
        email: String!
        posts: [Post]
    }

    type UserWithoutPost {
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
        me: User
    }

    type Subscription {
        newMessage: String
    }

    input UserInput {
        id: ID
        name: String!
        email: String!
        password: String!
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

export default () => [User, Post]
