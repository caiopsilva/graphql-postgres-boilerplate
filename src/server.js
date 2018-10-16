import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { schema } from './api/schema'
import { getUser } from './api/utils'

const port = process.env.PORT || 4000

const server = new ApolloServer({
  schema,
  context: async req => {
    const token = req.ctx.request.header.authorization || ''
    const user = await getUser(token)
    return { ...user }
  }
})

const app = new Koa()

server.applyMiddleware({ app })

app.listen(port, () =>
  console.log(`http://localhost:4000${server.graphqlPath} 🚀`)
)
