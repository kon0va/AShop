import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  UserType
} from './model'

import { base } from '../../config'
import axios from 'axios'

const baseUrl = base.base_url

function fetchResponseByURL (relativeURL) {
  return axios(baseUrl + relativeURL)
}

function fetchUser () {
  return fetchResponseByURL('/api/users')
}

function fetchUserByURL (relativeURL) {
  return fetchResponseByURL(relativeURL)
}

const User = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    return fetchUserByURL(`/api/users/${params.id}`)
  }
}

const Users = {
  type: new GraphQLList(UserType),
  args: {},
  resolve (root, params, options) {
    return fetchUser()
  }
}

export default {
  User,
  Users
}
