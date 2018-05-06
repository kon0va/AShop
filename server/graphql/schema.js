import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'

import UserQueries from './user/query'
import UserMutation from './user/mutation'
import ActivityQueries from './activity/query'
// import ActivityMutation from './activity/mutation'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: Object.assign(
      UserQueries,
      ActivityQueries
    )
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutations',
    fields: Object.assign(
      UserMutation
    )
  })
})
