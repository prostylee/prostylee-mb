import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import styles from './styles'

import FeedItem from './item'

const VerticalFeed = ({newFeedList}) => {
  return (
    <FlatList
        data={newFeedList?.content || []}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
            <FeedItem
              key = {'newFeedItem' + item.id}
              newFeedItem={item}
            /> 
          )}
        onEndReachedThreshold={0.5}
        initialNumToRender={10} 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    >
      
    </FlatList>
  )
}

VerticalFeed.defaultProps = {
}

VerticalFeed.propTypes = {
}

export default VerticalFeed
