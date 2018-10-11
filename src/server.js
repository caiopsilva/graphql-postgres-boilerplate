import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { schema } from './api/schema'

const port = process.env.PORT || 4000

const server = new ApolloServer({
  schema,
  context: async req => ({
    ...req
  })
})

const app = new Koa()

server.applyMiddleware({ app })

app.listen(port, () =>
  console.log(`http://localhost:4000${server.graphqlPath} 🚀`)
)
