import React, { Component } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { List, ListItem, Avatar } from 'react-native-elements'
import moment from 'moment'

class RepositoryList extends Component {
  render() {
    return (
      <View>
        <View style={styles.userInfoContainer}>
          <Avatar xlarge rounded source={{ uri: this.props.user.avatarUrl }} />
          <Text>{this.props.user.name}'s repositories</Text>
        </View>
        <View style={styles.listContainer}>
          <List containerStyle={styles.list}>
            <FlatList
              data={this.props.user.repositories.nodes}
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userInfoContainer: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 10
  },
  listContainer: {
    // ...
  },
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  loading: {
    // margin: 50
  }
})

export default RepositoryList
