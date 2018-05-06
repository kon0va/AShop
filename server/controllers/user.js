import mongoose from 'mongoose'
// import xss from 'xss'

const User = mongoose.model('User')
const Payment = mongoose.model('Payment')

async function dbUsers (ctx, next) {
  const res = await User.find({}).exec()
  ctx.body = res
}

async function dbUser (ctx, next) {
  const id = ctx.params.id
  const res = await User.findOne({ _id: id }).exec()
  ctx.body = res
}

async function getPayments (ctx, next) {
  const res = await Payment
    .find({ success: 1 })
    .populate('product user')
    .exec()
  ctx.body = res
}

async function login (ctx, next) {
  const {
    email,
    password
  } = ctx.request.body

  try {
    var user = await User.findOne({ email: email }).exec()
    var match = null
    if (user) match = await user.comparePassword(password, user.password)
  } catch (e) {
    throw new Error(e)
  }

  if (match) {
    ctx.session.user = {
      _id: user._id,
      role: user.role,
      email: user.email,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl
    }

    ctx.body = {
      ret: 0,
      user: {
        email: user.email,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl
      },
      msg: 'ok'
    }
    return
  }

  ctx.body = {
    ret: 1,
    errors: {
      err: 'USER.WRONG_PASSWORD'
    }
  }
}

export {
  dbUser,
  dbUsers,
  getPayments,
  login
}
