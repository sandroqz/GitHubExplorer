import React, { Component } from 'react'
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import Main from './src/components/Main'
import { GH_API_ENDPOINT, GH_AUTH_TOKEN } from './src/constants'

const networkInterface = createNetworkInterface({ uri: GH_API_ENDPOINT })

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      req.options.headers.authorization = `Bearer ${GH_AUTH_TOKEN}`
      next()
    }
  }
])

const client = new ApolloClient({ networkInterface })

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    )
  }
}
