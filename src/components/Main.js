import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { graphql, gql } from 'react-apollo'
import { List, ListItem } from 'react-native-elements'
import moment from 'moment'

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
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.props.userRepositoriesQuery.user.repositories.nodes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              hideChevron
              title={`${item.name}`}
              subtitle={`Created at ${moment(new Date(item.createdAt)).format('DD/MM/YYYY')}`}
              badge={{
                value: `${item.primaryLanguage ? item.primaryLanguage.name : 'Unknown'}`,
                containerStyle: {
                  right: 10,
                  backgroundColor: `${item.primaryLanguage ? item.primaryLanguage.color : '#696969'}`
                },
                textStyle: { fontSize: 12 }
              }}
            />
          )}
        />
      </List>
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

const USER_REPOSITORIES_QUERY = gql`
  query UserRepositoriesQuery($login: String!) {
    user(login: $login) {
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

export default graphql(USER_REPOSITORIES_QUERY, {
  name: 'userRepositoriesQuery',
  options: {
    variables: {
      login: 'sandroqz'
    }
  }
})(Main)
