const jwt = require('jsonwebtoken')
const APP_SECRET = 'segredo'

export const getUserId = ctx => {
  const auth = ctx.headers.authorization
  if (auth) {
    const token = auth.replace('Bearer ', '')
    const { id } = jwt.verify(token, APP_SECRET)
    return id
  }
  throw new Error('Not authenticated')
}
