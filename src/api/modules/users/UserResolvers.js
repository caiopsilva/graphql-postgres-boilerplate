import * as UserLoader from './UserLoader'

export default {
  Query: {
    me: (_, data, context) => UserLoader.me(data, context),
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
