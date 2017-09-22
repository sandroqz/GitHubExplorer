import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { graphql, gql } from 'react-apollo'

const USER_REPOSITORIES_QUERY = gql`
  query UserRepositoriesQuery($login: String!) {
    user(login: $login) {
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          id
          name
          url
          createdAt
        }
      }
    }
  }
`

class Main extends Component {
  render() {
    if (this.props.userRepositoriesQuery.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.userRepositoriesQuery.user.repositories.nodes}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})

export default graphql(USER_REPOSITORIES_QUERY, {
  name: 'userRepositoriesQuery',
  options: {
    variables: {
      login: 'sandroqz'
    }
  }
})(Main)
