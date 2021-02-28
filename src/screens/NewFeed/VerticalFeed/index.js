import React from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator, FlatList} from 'react-native';
import styles from './styles';

import {Colors} from 'components';

import FeedItem from './item';

import {targetTypeSelector} from 'redux/selectors/common';

const VerticalFeed = ({
  newFeedList,
  handleLoadMore,
  loadMoreLoading,
  handleRefresh,
  refreshing,
  loading,
  isFirst,
}) => {
  const targetType = useSelector((state) => targetTypeSelector(state));
  if (isFirst && loading) {
    return null;
  }
  const renderFooter = () => {
    if (!loadMoreLoading) {
      return <View style={styles.viewFooter} />;
    }

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  return (
    <FlatList
      data={newFeedList?.content || []}
      keyExtractor={(item, index) => 'newFeedkeyExtractor' + targetType + index}
      renderItem={({item, index}) => (
        <FeedItem
          targetType={targetType}
          key={'newFeedItem' + targetType + index}
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
    />
  );
};

VerticalFeed.defaultProps = {
  isFirst: false,
};

VerticalFeed.propTypes = {};

export default VerticalFeed;
