import * as UserLoader from './UserLoader'
import { PubSub } from 'apollo-server'

const MESSAGE_CREATED = 'MESSAGE_CREATED'

const pubsub = new PubSub()

export default {
  Query: {
    me: (_, data, context) => UserLoader.me(data, context, pubsub),
    getUsers: (_, data, context) => UserLoader.loadUsers(data, context),
    getUser: (_, data, context) => UserLoader.loadUser(data, context)
  },
  Mutation: {
    createUser: (_, data, context) => UserLoader.createUser(data, context),
    updateUser: (_, data, context) => UserLoader.updateUser(data, context),
    deleteUser: (_, data, context) => UserLoader.deleteUser(data, context),
    login: (_, data, context) => UserLoader.login(data, context)
  },
  Subscription: {
    newMessage: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED])
    }
  }
}
