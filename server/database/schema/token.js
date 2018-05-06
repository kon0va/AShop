import mongoose, { Schema } from 'mongoose'
import { hasValue } from '../../../utils/mUtils'

const TokenSchema = new Schema({
  openid: String,
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

TokenSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

TokenSchema.statics = {
  async getAccessToken (openid = '') {
    const token = await this.findOne({ openid }).exec()
    console.log(token)
    if (hasValue(token)) {
      let expiresAt = token.meta.updateAt + token['expires_in']
      if (expiresAt > Date.now()) return token
    }
    return ''
  },

  async saveAccessToken (data) {
    let token = await this.findOne({ openid: data.openid }).exec()
    if (token) {
      token.access_token = data.access_token
      token.expires_in = data.expires_in
      token.refresh_token = data.refresh_token
    } else {
      token = new Token({
        openid: data.openid,
        expires_in: data.expires_in,
        access_token: data.access_token,
        refresh_token: data.refresh_token
      })
    }

    let result = ''

    try {
      result = await token.save()
    } catch (e) {
      console.log('Token save failed.')
      console.log(e.message)
    }

    return result
  }
}

const Token = mongoose.model('Token', TokenSchema)
export default Token
