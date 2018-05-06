import mongoose from 'mongoose'
import { resolve } from 'path'
import { db } from '../config'

// const models = resolve(__dirname, '../database/schema')

export const database = (ctx, next) => {
  mongoose.connect(db)
  mongoose.connection.on('disconnected', () => {
    mongoose.disconnect(db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', db)
    const User = mongoose.model('User')

    let user = await User.findOne({email: '你的默认账号'}).exec()
    if (!user) new User({email: '你的默认账号', password: '密码', role: 'admin'}).save()
  })
  next()
}
