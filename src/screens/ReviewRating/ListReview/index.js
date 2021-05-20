/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList} from 'react-native';

import {Colors, ThemeView} from 'components';
import BottomHeaderAnimated from '../BottomHeaderAnimated';
import ReviewItem from '../ReviewItem';

import {useDispatch} from 'react-redux';

const ListReview = ({navigation, data}) => {
  const dispatch = useDispatch();

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const [refreshing, handleRefreshing] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  useEffect(() => {}, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {};

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

  const leftPress = () => {
    navigation.goBack();
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <BottomHeaderAnimated />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <ReviewItem navigation={navigation} item={item} />
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={() => handleLoadMore()}
        ListFooterComponent={renderFooter}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollEvent}
      />
    </ThemeView>
  );
};

ListReview.defaultProps = {data: []};

ListReview.propTypes = {};

export default ListReview;
