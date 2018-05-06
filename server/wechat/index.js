import mongoose from 'mongoose'
import { wechat } from '../config'
import Wechat from '../wechat-lib'
import WechatOAuth from '../wechat-lib/oauth'

const Token = mongoose.model('Token')
const Ticket = mongoose.model('Ticket')

const wechatConfig = {
  wechat: {
    appID: wechat.appID,
    appSecret: wechat.appSecret,
    token: wechat.token,
    getAccessToken: async () => {
      let token = await Token.getAccessToken()
      return token
    },
    saveAccessToken: async (data) => {
      await Token.saveAccessToken(data)
    },
    getTicket: async () => {
      let ticket = await Ticket.getTicket()
      return ticket
    },
    saveTicket: async (data) => {
      await Ticket.saveTicket(data)
    }
  }
}

export const getWechat = () => {
  const wechatClient = new Wechat(wechatConfig.wechat)

  return wechatClient
}

export const getOAuth = () => {
  const oauth = new WechatOAuth(wechatConfig.wechat)

  return oauth
}
