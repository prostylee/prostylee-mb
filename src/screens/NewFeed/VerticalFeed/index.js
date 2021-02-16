import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, ActivityIndicator, FlatList} from 'react-native'
import styles from './styles'

import FeedItem from './item'

import {NewFeedContentLoading} from 'components/Loading/contentLoader'

const VerticalFeed = ({newFeedList, handleLoadMore, loadMoreLoading, handleRefresh, refreshing, loading}) => {

  if (loading) {
    return(
      <>
        {[1, 2].map((item, _i) => (
          <NewFeedContentLoading key={'newFeedLoading' + _i} />
        ))}
      </>
    )
  }
   const renderFooter = () => {
    if (!loadMoreLoading) return <View style={styles.viewFooter} />

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating size="small" />
      </View>
    )
  }
  return (
    <FlatList
        data={newFeedList?.content || []}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, _i }) => (
            <FeedItem
              key = {'newFeedItem' + _i}
              newFeedItem={item}
            /> 
          )}
        onEndReached={() => handleLoadMore()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={renderFooter}
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
