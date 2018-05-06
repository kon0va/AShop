import Router from 'koa-router'
import * as controllers from '../controllers'
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
import schema from '../graphql/schema'

import { wechat } from '../config'

import reply from '../wechat/reply'
import webchatMiddle from '../wechat-lib/middleware'

const router = new Router()

// ************ Route to GraphQL ************
router.get('/graphiql', async (ctx, next) => {
  await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next)
})

router.get('/graphql', async (ctx, next) => {
  await graphqlKoa({ schema: schema })(ctx, next)
})

router.post('/graphql', async (ctx, next) => {
  await graphqlKoa({ schema: schema })(ctx, next)
})

// ************ Route to WeChat ************
router.get('/wechat', async (ctx, next) => {
  const middle = webchatMiddle(wechat, reply)
  await middle(ctx, next)
})

router.post('/wechat', async (ctx, next) => {
  const middle = webchatMiddle(wechat, reply)
  await middle(ctx, next)
})

router.get('/wechat-signature', async(ctx, next) => {
  await controllers.wechat.signature(ctx, next)
})

router.get('/wechat-redirect', async(ctx, next) => {
  await controllers.wechat.redirect(ctx, next)
})

router.get('/wechat-oauth', async (ctx, next) => {
  await controllers.wechat.oauth(ctx, next)
})

// ************ Route to Common ************
router.get('/products/:_id', async(ctx, next) => {
  
})

export default router
