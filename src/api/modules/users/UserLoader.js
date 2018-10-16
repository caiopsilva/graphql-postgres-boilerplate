import db from '../../../config/database'
import uuid from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../../../.env'

export const loadUser = async (args, context) => {
  const result = await db('users').where({ id: args.id }).first()
  return result
}

export const loadUsers = async (args, context) => {
  const result = await db('users')
    .limit(args.q.limit)
    .offset(args.q.offset)
    .modify(function (query) {
      if (args.q.text) {
        query.where('name', 'ilike', `%${args.q.text}%`)
      }
    })
  return result
}

export const createUser = async (args, context) => {
  const password = await bcrypt.hash(args.input.password, 10)
  const result = await db('users')
    .insert({
      id: uuid(),
      name: args.input.name,
      email: args.input.email,
      password
    })
    .returning('*')
  return result[0]
}

export const deleteUser = async (args, context) => {
  if (context.user) {
    const result = await db('users').where({ id: args.id }).del().returning('*')
    return result[0]
  } else {
    return context.msg
  }
}

export const updateUser = async (args, context) => {
  const result = await db('users')
    .where({ id: args.input.id })
    .update({
      name: args.input.name,
      email: args.input.email,
      password: args.input.password
    })
    .returning('*')
  return result[0]
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
