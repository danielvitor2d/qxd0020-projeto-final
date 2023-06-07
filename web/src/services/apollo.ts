import { useAuthStore } from '@/stores/authStore'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const setAuthorizationLink = setContext((_, { headers }) => {
  const { token } = useAuthStore() // Access the token from the Pinia store

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql'
})

const apolloClient = new ApolloClient({
  link: setAuthorizationLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default apolloClient
