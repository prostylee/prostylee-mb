/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList} from 'react-native';

import {Colors} from 'components';
import Item from './Item';
import {CategoriesLeftLoading} from 'components/Loading/contentLoader';
import {useDispatch, useSelector} from 'react-redux';

import {
  getVoucherLoadingSelector,
  getListVoucherSelector,
  getLoadVoucherMoreLoadingSelector,
  getHasLoadMoreVoucherSelector,
  getPageVoucherSelector,
} from 'redux/selectors/cart';

import {cartActions} from 'redux/reducers';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const ListVoucher = ({navigation, data}) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => getVoucherLoadingSelector(state));

  const listVoucherSelector = useSelector((state) =>
    getListVoucherSelector(state),
  );

  const listVoucher = listVoucherSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadVoucherMoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreVoucherSelector(state),
  );

  const page = useSelector((state) => getPageVoucherSelector(state));

  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  const [refreshing, handleRefreshing] = useState(false);

  useEffect(() => {
    dispatch(
      cartActions.getListVoucher({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
    handleRefreshing(false);
  }, [dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        cartActions.getListvoucherLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
        }),
      );
    }
  };

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
    <View style={styles.container}>
      {loading && !listVoucher.length === 0 ? (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
            (item, _i) => {
              return (
                <CategoriesLeftLoading
                  key={'CategoriesLeftLoading' + _i}
                  style={{marginTop: 5, width: 90, height: 90}}
                />
              );
            },
          )}
        </>
      ) : (
        <FlatList
          data={listVoucher}
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
      )}
    </View>
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
