import db from '../config/database'
import jwt from 'jsonwebtoken'
const APP_SECRET = 'segredo'

export const getUserId = async ctx => {
  const auth = ctx.headers.authorization
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const { id } = jwt.verify(token, APP_SECRET)

    const validToken = await db('users').where({ id }).first()

    if (validToken) {
      return true
    } else {
      return false
    }
  } else {
    throw new Error('Not authenticated')
  }
}
