import mongoose from 'mongoose'
import UserSchema from './schema/user'
import TokenModel from './schema/token'
import TicketSchema from './schema/ticket'
import ActivitySchema from './schema/activity'
import { db } from '../config'

const { url } = db

mongoose.model('User', UserSchema)
// mongoose.model('Token', TokenSchema)
mongoose.model('Ticket', TicketSchema)
mongoose.model('Activity', ActivitySchema)

export default function () {
  mongoose.connect(url)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(url)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', url)

    const User = mongoose.model('User')

    let user = await User.findOne({ email: 'A@A.com' }).exec()
    if (!user) {
      try {
        let user = new User({email: 'A@A.com', password: '!QAZ2wsx', role: 'admin'})
        let result = await user.save()
        console.log(result)
      } catch (e) {
        console.error(e)
      }
      user = await User.findOne({ email: 'A@A.com' }).exec()
      console.log(user)
    }
  })
}
