/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, ActivityIndicator, FlatList, Text} from 'react-native';
import {Colors, ThemeView} from 'components';
import Item from './Item';
import {useDispatch} from 'react-redux';
import i18n from 'i18n';

const ListProduct = ({navigation, data}, ref) => {
  const dispatch = useDispatch();

  const [listProductData, setListProductData] = useState(data || []);

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
  useEffect(() => {
    setListProductData(data);
  }, [data]);

  const onRateSuccess = React.useCallback((itemId) => {
    let newList = [...listProductData].filter((item) => item.id !== itemId);
    setListProductData([...newList]);
  }, []);

  React.useImperativeHandle(ref, () => ({
    hasRefresh: data?.length !== listProductData?.length || false,
  }));

  return listProductData && listProductData?.length ? (
    <FlatList
      data={listProductData}
      renderItem={({item}) => (
        <Item
          navigation={navigation}
          item={item}
          onRateSuccess={onRateSuccess}
        />
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
  ) : (
    <Text style={styles.notFoundText}>
      {i18n.t('rateProduct.nothingToRate')}
    </Text>
  );
};

// ListProduct.propTypes = {};

export default React.forwardRef(ListProduct);
