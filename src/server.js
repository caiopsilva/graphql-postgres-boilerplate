import Koa from 'koa'
import { ApolloServer } from 'apollo-server-koa'
import { schema } from './api/schema'
// import KoaRouter from 'koa-router'
// import koaBody from 'koa-bodyparser'

const port = process.env.PORT || 4000

const server = new ApolloServer({ 
  schema,
  context: async req => ({
    ...req
  })
})

const app = new Koa()
// const router = new KoaRouter()

server.applyMiddleware({ app })

// app.use(koaBody())
// app.use(router.routes())
// app.use(router.allowedMethods())

app.listen(port, () =>
  console.log(`http://localhost:4000${server.graphqlPath} 🚀`)
)
