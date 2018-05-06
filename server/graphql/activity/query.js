import mongoose from 'mongoose'
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  ActivityType
} from './model'

const mActivity = mongoose.model('Activity')

const Activity = {
  type: ActivityType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    let activity = mActivity.findById(params.id).exec()
    return activity
  }
}

const Activities = {
  type: new GraphQLList(ActivityType),
  args: {},
  resolve (root, params, options) {
    return mActivity.find().exec()
  }
}

export default {
  Activity,
  Activities
}
