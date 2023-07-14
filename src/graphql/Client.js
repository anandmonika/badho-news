import { ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const restLink = new RestLink({
    uri: 'https://newsapi.org/v2/',
    headers: {
      Authorization: '907768b8be5b43d58acb271e0ae0eb09'
    }
  })

  export const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache()
  })