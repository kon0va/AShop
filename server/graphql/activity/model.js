import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} from 'graphql'

import GraphQLDate from 'graphql-date'

export let ActivityType = new GraphQLObjectType({
  name: 'Activity',
  fields: {
    _id: {
      type: GraphQLID
    },
    type: {
      type: GraphQLInt
    },
    title: {
      type: GraphQLString
    },
    date_from: {
      type: GraphQLDate
    },
    date_to: {
      type: GraphQLDate
    },
    summary: {
      type: GraphQLString
    },
    rate: {
      type: GraphQLInt
    }
  }
})

export let ActicityInput = new GraphQLInputObjectType({
  name: 'ActivityInput',
  fields: {
    _id: {
      type: GraphQLID
    }
  }
})