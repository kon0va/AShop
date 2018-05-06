import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const ObjectId = Schema.Types.ObjectId
const Mixed = Schema.Types.Mixed

const UserSchema = new Schema({
  openid: [String],
  avatarUrl: String,
  nickname: String,
  phoneNumber: String,
  address: String,
  name: String,
  role: {
    type: String,
    default: 'user'
  },
  sex: String,
  email: String,
  unionid: String,
  country: String,
  province: String,
  city: String,
  gender: String,
  password: {
    type: String
  },
  hashed_password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUtil: {
    type: Number
  },
  description: String,
  code: String,
  resetPasswordToken: String,
  resetPasswordTime: Date,
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

UserSchema.virtual('isLocked').get(() => {
  return !!(this.lockUtil && this.lockUtil > Date.now())
})

UserSchema.virtual('token').get(() => {
  let salt = bcrypt.genSaltSync()
  let token = bcrypt.hashSync(String(this._id), salt)

  return token
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

UserSchema.methods = {
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (err) reject(err)
        else resolve(isMatch)
      })
    })
  }
}

export default UserSchema
