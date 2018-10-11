import db from '../../../config/database'
import uuid from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../../../.env'
import { getUserId } from '../../utils'

export const loadUser = async ({ id }) => {
  const result = await db('users').where({ id }).first()
  return result
}

export const loadUsers = async (root, args, context) => {
  const result = await db('users')
  return result
}

export const createUser = async ({ input }) => {
  const password = await bcrypt.hash(input.password, 10)
  const result = await db('users')
    .insert({
      id: uuid(),
      name: input.name,
      email: input.email,
      password
    })
    .returning('*')
  return result[0]
}

export const deleteUser = async (obj, args, context, info) => {
  const auth = await getUserId(context.ctx)
  console.log(auth)
  if (auth) {
    const result = await db('users').where({ id: args.id }).del().returning('*')
    return result[0]
  } else {
    throw new Error('Not Authorized')
  }
}

export const updateUser = async ({ input }) => {
  const result = await db('users')
    .where({ id: input.id })
    .update({
      name: input.name,
      email: input.email,
      password: input.password
    })
    .returning('*')
  return result[0]
}

export const login = async ({ input }) => {
  const user = await db('users').where({ email: input.email }).first()
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(input.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ id: user.id }, APP_SECRET)

  return { user, token }
}
