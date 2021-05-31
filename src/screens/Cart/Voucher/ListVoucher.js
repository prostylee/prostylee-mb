/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList} from 'react-native';

import {Colors} from 'components';
import Item from './Item';

import {useDispatch} from 'react-redux';

const ListVoucher = ({navigation, data}) => {
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

ListVoucher.defaultProps = {
  data: [
    {
      id: 231,
      logoImage:
        'https://bcassetcdn.com/public/blog/wp-content/uploads/2020/03/20174653/mens-tuxedo-by-fishdesign61025-brandcrowd.png',
      category: 'Pull&Bear',
      description: 'Giảm 500K Cho đơn hàng từ 5 triệu',
      expired: '26/06/2020',
    },
    {
      id: 232,
      logoImage:
        'https://cdn.theorg.com/3b035172-f960-40c2-b417-e6300da1383b_thumb.png',
      category: 'Prostylee',
      description: 'Giảm 20% Đơn Tối Thiểu ₫0 Giảm tối đa ₫10k',
      expired: '29/06/2020',
    },
    {
      id: 233,
      logoImage:
        'https://bcassetcdn.com/public/blog/wp-content/uploads/2020/03/20174653/mens-tuxedo-by-fishdesign61025-brandcrowd.png',
      category: 'Johnson & Johnson',
      description: 'Giảm 500K Cho đơn hàng từ 5 triệu',
      expired: '02/07/2020',
    },
    {
      id: 234,
      logoImage:
        'https://bcassetcdn.com/public/blog/wp-content/uploads/2020/03/20174653/mens-tuxedo-by-fishdesign61025-brandcrowd.png',
      category: 'Pull&Bear',
      description: 'Giảm 20% Đơn Tối Thiểu ₫0 Giảm tối đa ₫10k',
      expired: '23/07/2020',
    },
    {
      id: 235,
      logoImage:
        'https://bcassetcdn.com/public/blog/wp-content/uploads/2020/03/20174653/mens-tuxedo-by-fishdesign61025-brandcrowd.png',
      category: 'Pull&Bear',
      description: 'Giảm 20% Đơn Tối Thiểu ₫0 Giảm tối đa ₫10k',
      expired: '30/07/2020',
    },
  ],
};

ListVoucher.propTypes = {};

export default ListVoucher;
