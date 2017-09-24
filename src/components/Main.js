import React, { Component } from 'react'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { gql, withApollo } from 'react-apollo'
import { SearchBar, Button } from 'react-native-elements'
import RepositoryList from './RepositoryList'

class Main extends Component {
  state = {
    user: null,
    login: ''
  }

  _onChangeText = e => {
    this.setState({ login: e })
  }

  render() {
    // if (this.props.userRepositoriesQuery.loading) {
    //   return <ActivityIndicator style={styles.loading} />
    // }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>GitHub Explorer</Text>
        </View>
        <View style={styles.searchContainer}>
          <SearchBar
            round
            clearIcon
            lightTheme
            autoCapitalize="none"
            placeholder="Type username here..."
            onChangeText={this._onChangeText}
          />
          <Button
            title="Go!"
            borderRadius={50}
            backgroundColor="#178f5f"
            onPress={() => this._executeSearch()}
          />
        </View>
        {this.state.user ? (
          <RepositoryList user={this.state.user} />
        ) : (
          <View>
            <Text>User not found!</Text>
          </View>
        )}
      </View>
    )
  }

  _executeSearch = async () => {
    const { login } = this.state
    const result = await this.props.client.query({
      query: USER_REPOSITORIES_QUERY,
      variables: { login }
    })
    const user = result.data.user
    this.setState({ user })
  }
}

const USER_REPOSITORIES_QUERY = gql`
  query UserRepositoriesQuery($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          name
          createdAt
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#dfe8ee'
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#1570c6'
  },
  headerTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  loading: {
    margin: 50
  }
})

export default withApollo(Main)
