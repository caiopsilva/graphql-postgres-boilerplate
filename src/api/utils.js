import db from '../config/database'
import jwt from 'jsonwebtoken'
const APP_SECRET = 'segredo'

export const getUser = async token => {
  if (token) {
    token = token.replace('Bearer ', '')
    const { id } = jwt.verify(token, APP_SECRET)

    const user = await db('users').where({ id }).first()

    if (user) {
      return { user }
    } else {
      throw new Error('Not authorized')
    }
  } else {
    return { msg: 'Not authenticated' }
  }
}
