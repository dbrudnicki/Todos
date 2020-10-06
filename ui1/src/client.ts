import { ApolloClient, InMemoryCache } from '@apollo/client'

/**
 * The configured client.
 */
export const client = new ApolloClient({
  uri: 'http://localhost:1234',
  cache: new InMemoryCache()
})
