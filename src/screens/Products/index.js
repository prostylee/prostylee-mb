import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  TouchableOpacity as Touch,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './styles';

import {ThemeView, Colors, HeaderAnimated} from 'components';

import ProductItem from './ProductItem';
import {getCategoriesSelectSelector} from 'redux/selectors/categories';
import {ChevronLeft} from 'svg/common';
import HeaderList from './HeaderList';
import BottomHeaderAnimated from './BottomHeaderAnimated';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListProductSelector,
  getListProductLoadingSelector,
  getLoadProductMoreLoadingSelector,
  getHasLoadMoreProductSelector,
  getPageProductSelector,
} from 'redux/selectors/product';

import {productActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

const heightShow = 334;
import {ProductLoading} from 'components/Loading/contentLoader';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = WIDTH / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;

const Products = ({navigation}) => {
  /*Animated*/
  const scrollAnimated = useRef(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollAnimated}}}],
    {useNativeDriver: false},
  );

  /*Custom action*/
  const leftPress = () => {
    navigation.goBack();
  };

  /*Get List Product*/
  const dispatch = useDispatch();
  const categoriesSelect = useSelector((state) =>
    getCategoriesSelectSelector(state),
  );

  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector((state) => getListProductLoadingSelector(state));

  const listProductSelector = useSelector((state) =>
    getListProductSelector(state),
  );

  const listProduct = listProductSelector?.content || [];

  const loadMoreLoading = useSelector((state) =>
    getLoadProductMoreLoadingSelector(state),
  );

  const hasLoadMore = useSelector((state) =>
    getHasLoadMoreProductSelector(state),
  );

  const page = useSelector((state) => getPageProductSelector(state));

  useEffect(() => {
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        categoryId: categoriesSelect?.id,
        sorts: 'name',
      }),
    );
    handleRefreshing(false);
  }, [categoriesSelect.id, dispatch, refreshing]);

  const handleRefresh = () => {
    handleRefreshing(true);
  };

  const handleLoadMore = () => {
    if (hasLoadMore) {
      dispatch(
        productActions.getListProductLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          categoryId: categoriesSelect?.id,
          sorts: 'name',
        }),
      );
    }
  };
  const _handleSort = (value) => {
    let sortOption = {};
    switch (value) {
      case 1: {
        sortOption.sorts = 'name';
        break;
      }
      case 2: {
        sortOption.bestSeller = true;
        break;
      }
      case 3: {
        sortOption.sorts = '-createdAt';
        break;
      }
      case 4: {
        sortOption.sorts = '-priceSale';
        break;
      }
      case 5: {
        sortOption.sorts = 'priceSale';
        break;
      }
      default: {
        sortOption.bestRating = true;
        break;
      }
    }
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };
  const _handleFilterByTag = (queryObject) => {
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
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
    <ThemeView style={styles.container} isFullView>
      {loading && !listProduct.length ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
          ListHeaderComponent={
            <HeaderList
              leftPress={leftPress}
              navigation={navigation}
              heightShow={heightShow}
            />
          }
          renderItem={({item}) => {
            return (
              <View style={styles.wrapProduct}>
                <ProductLoading width={WIDTH_IMAGE} height={HEIGHT_IMAGE} />
              </View>
            );
          }}
          numColumns={2}
          scrollEventThrottle={1}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <>
          <HeaderAnimated
            leftComponent={
              <Touch style={styles.leftTouch} onPress={leftPress}>
                <ChevronLeft color={Colors.$black} />
              </Touch>
            }
            midComponent={
              <Text numberOfLines={1} style={styles.textTitle}>
                {categoriesSelect?.name}
              </Text>
            }
            bottomComponent={
              <BottomHeaderAnimated
                navigation={navigation}
                onSortPress={_handleSort}
                onTagPress={_handleFilterByTag}
              />
            }
            bottomHeight={100}
            hideBottomBorder={true}
            heightShow={heightShow - 190}
            Animated={Animated}
            navigation={navigation}
            scrollAnimated={scrollAnimated}
          />
          <FlatList
            data={listProduct}
            ListHeaderComponent={
              <HeaderList
                leftPress={leftPress}
                navigation={navigation}
                heightShow={heightShow}
              />
            }
            renderItem={({item, index}) => {
              return (
                <View style={styles.wrapProduct}>
                  <ProductItem index={index} item={item} />
                </View>
              );
            }}
            numColumns={2}
            onScroll={onScrollEvent}
            scrollEventThrottle={1}
            keyExtractor={(item, index) => index}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={() => handleLoadMore()}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </ThemeView>
  );
};

Products.defaultProps = {};

Products.propTypes = {};

export default Products;
