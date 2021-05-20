/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList} from 'react-native';

import {Colors, ThemeView} from 'components';
import Item from './Item';

import {useDispatch} from 'react-redux';

const ListProduct = ({navigation, data}) => {
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
    <FlatList
      data={data}
      renderItem={({item}) => <Item navigation={navigation} item={item} />}
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
  );
};

ListProduct.defaultProps = {
  data: [
    {
      id: '1234567890',
      image:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      name: 'Ao thum nam den ',
      price: 99000,
      count: 1,
      size: 'M',
      color: 'Den',
    },
    {
      id: '1234567891',
      image:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      name: 'Ao thum nam den ',
      price: 99000,
      count: 1,
      size: 'M',
      color: 'Den',
    },
    {
      id: '1234567892',
      image:
        'https://xuongsiquanao.vn/wp-content/uploads/2019/08/3a306dbe5fe2b8bce1f3.jpg',
      name: 'Ao thum nam den ',
      price: 99000,
      count: 1,
      size: 'M',
      color: 'Den',
    },
  ],
};

ListProduct.propTypes = {};

export default ListProduct;
