import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa2-session-ioredis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'

const app = new Koa()

app.keys = ['keys', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis({})
}, app))
app.use(bodyParser({
  extendTypes: ['json', 'from', 'text']
}))
app.use(json())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true // useNewUrlParser这个属性会在url里识别验证用户所需的db，未升级前是不需要指定的，升级到一定要指定，不管是在url后面，还是用authSource
})
app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
import config from '../nuxt.config.js'
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
