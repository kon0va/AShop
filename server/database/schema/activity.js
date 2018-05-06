import { Schema } from 'mongoose'

const ActivitySchema = new Schema({
  type: Number,
  band_id: Number,
  title: String,
  date_from: {
    type: Date,
    default: Date.now()
  },
  date_to: {
    type: Date,
    default: Date.now()
  },
  time_from: String,
  summary: String,
  rate: Number,
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

ActivitySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

export default ActivitySchema
