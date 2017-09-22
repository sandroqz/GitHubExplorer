import React, { Component } from 'react'
import { View, ListView, StyleSheet, Text } from 'react-native'
import { graphql, gql } from 'react-apollo'

const USER_REPOSITORIES_QUERY = gql`
  query UserRepositoriesQuery($login: String!) {
    user(login: $login) {
      repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          name
          url
          createdAt
        }
      }
    }
  }
`

class Main extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows([]),
      modalVisible: false,
      user: undefined
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.userRepositoriesQuery.loading && !nextProps.userRepositoriesQuery.error) {
      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.userRepositoriesQuery.user.repositories.nodes)
      })
    }
  }

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
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={repository => <Text>{repository.name}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
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
