import { AuthenticationError } from 'apollo-server-koa'
import db from '../../../config/database'
import User from '../../../config/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../../../.env'

export const me = async (args, context, pubsub, MESSAGE_CREATED) => {
  await pubsub.publish(MESSAGE_CREATED, { newMessage: 'pubsub' })
  return context.user
}

export const loadUser = async (args, context) => {
  const user = await new User({ id: args.id }).fetch({ withRelated: ['posts'] })

  return user.toJSON()
}

export const loadUsers = async (args, context) => {
  const users = await new User()
    .query(function (query) {
      if (args.q.text) {
        query.where('name', 'ilike', `%${args.q.text}%`)
      }
    })
    .fetchPage({
      limit: args.q.limit,
      offset: args.q.offset,
      withRelated: ['posts']
    })
    .catch(err => console.log(err))
  return users.toJSON()
}

export const createUser = async (args, context) => {
  const password = await bcrypt.hash(args.input.password, 10)

  const user = await new User({
    name: args.input.name,
    email: args.input.email,
    password
  }).save()

  return user.toJSON()
}

export const deleteUser = async (args, context) => {
  if (!context.user) {
    throw new AuthenticationError('Usuario sem token')
  }
  await new User({ id: args.id }).destroy()
  return { message: 'Usuario deletado' }
}

export const updateUser = async (args, context) => {
  const user = await new User().where('id', args.id).save({
    name: args.input.name,
    email: args.input.email,
    password: args.input.password
  })

  return user.toJSON()
}

export const login = async (args, context) => {
  const user = await db('users').where({ email: args.input.email }).first()
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(args.input.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ id: user.id }, APP_SECRET)

  return { user, token }
}
