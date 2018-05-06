import * as wechatAPI from '../api/wechat'
import { parse as urlParse } from 'url'
import { parse as queryParse } from 'querystring'
import { wechat } from '../config'
import { hasValue } from '../../utils/mUtils'

import {
  fetchUserByOpenId
} from '../api/user'

const oauthUrl = wechat.baseUrl + '/oauth'

export async function redirect (ctx, next) {
  // let scope = 'snsapi_userinfo'
  const { visit, id } = ctx.query
  const params = id ? `${visit}_${id}` : visit
  const renew = ctx.session['renew_oauth']
  const openid = ctx.session.openid

  let url = ''

  if (openid) {
    url = `/oauth?state=${params}`
  } else {
    const scope = renew ? 'snsapi_userinfo' : 'snsapi_base'
    url = wechatAPI.getAuthorizeURL(oauthUrl, params, scope)
  }
  ctx.redirect(url)
}

export async function oauth (ctx, next) {
  const url = ctx.query.url
  const urlObj = urlParse(decodeURIComponent(url))
  const params = queryParse(urlObj.query)
  const code = params.code

  const openid = ctx.session['openid']

  let result = false
  let user = {}

  if (openid) {
    user = await fetchUserByOpenId(openid)

    if (user) result = true
  } else {
    const renew = ctx.session['renew_oauth']
    // params: { code, state }
    user = await wechatAPI.getUserByCode(code, !!renew)
    if (!hasValue(user)) {
      ctx.session = {
        'renew_oauth': true
      }
    } else {
      delete ctx.session['renew_oauth']
      ctx.session = {
        openid: user.openid
      }
      result = true
    }
  }

  delete user['openid']

  ctx.body = {
    result,
    user
  }
}
