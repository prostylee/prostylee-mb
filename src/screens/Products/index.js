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

import {ThemeView, Colors, HeaderAnimated, SortDropDown} from 'components';
import {SearchProductLoading} from 'components/Loading/contentLoader';
import i18n from 'i18n';

import ProductItem from './ProductItem';
import {
  getCategoriesSelectSelector,
  getCategoriesParentSelectSelector,
} from 'redux/selectors/categories';
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
import {getStatusBarHeight} from 'react-native-status-bar-height';

import {productActions} from 'redux/reducers';
import {LIMIT_DEFAULT, PAGE_DEFAULT, PRODUCT_SORT_ITEM} from 'constants';

const heightShow = 334;
import {ProductLoading} from 'components/Loading/contentLoader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const WIDTH_IMAGE = WIDTH / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;

const BOTTOM_HEADER_HEIGHT = 100;
const HEIGHT_HEADER = BOTTOM_HEADER_HEIGHT / 2 + 50 + getStatusBarHeight();

const Products = ({navigation}) => {
  const [sortVisible, setSortVisible] = useState(false);
  const [sortAction, setSortAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
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

  const categoryParentSelect = useSelector((state) =>
    getCategoriesParentSelectSelector(state),
  );
  const [refreshing, handleRefreshing] = useState(false);

  const loading = useSelector(
    (state) => getListProductLoadingSelector(state),
    () => {},
  );

  const listProductSelector = useSelector(
    (state) => getListProductSelector(state),
    () => {},
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
        ...filterValue,
        ...formatSortValue(valueSort),
      }),
    );
    // handleRefreshing(false);
  }, [categoriesSelect.id]);

  const handleRefresh = () => {
    let newSortValue = valueSort ? formatSortValue(valueSort) : {sorts: 'name'};
    handleRefreshing(true);
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        categoryId: categoriesSelect?.id,
        ...filterValue,
        ...newSortValue,
      }),
    );
  };

  const handleLoadMore = () => {
    if (hasLoadMore && !loadMoreLoading) {
      let newSortValue = valueSort
        ? formatSortValue(valueSort)
        : {sorts: 'name'};
      dispatch(
        productActions.getListProductLoadMore({
          page: page + 1,
          limit: LIMIT_DEFAULT,
          categoryId: categoriesSelect?.id,
          ...filterValue,
          ...newSortValue,
        }),
      );
    }
  };
  useEffect(() => {
    if (!loading) handleRefreshing(false);
  }, [loading]);
  const formatSortValue = (value) => {
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
    return sortOption;
  };
  const _handleSort = (value) => {
    let sortOption = formatSortValue(value);
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        categoryId: categoriesSelect?.id,
        ...filterValue,
        ...sortOption,
      }),
    );
  };
  const _handleFilterByTag = (queryObject) => {
    setFilterValue(queryObject);
    setValueSort(null);
    dispatch(productActions.clearProductCategoriesFilterState());
    dispatch(
      productActions.getListProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        categoryId: categoriesSelect?.id,
        ...queryObject,
        sorts: 'name',
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
  const NotFound = () => (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>
        {i18n.t('Search.resultsNotfound')}
      </Text>
    </View>
  );
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: sortVisible ? HEIGHT : 0,
    marginTop: sortVisible ? HEIGHT_HEADER : 0,
  };
  return (
    <ThemeView style={styles.container} isFullView>
      <>
        <HeaderAnimated
          leftComponent={
            <Touch style={styles.leftTouch} onPress={leftPress}>
              <ChevronLeft color={Colors.$black} />
            </Touch>
          }
          midComponent={
            <Text numberOfLines={1} style={styles.textTitle}>
              {categoryParentSelect?.name}
            </Text>
          }
          bottomComponent={
            <BottomHeaderAnimated
              navigation={navigation}
              onSortPress={_handleSort}
              onTagPress={_handleFilterByTag}
              setVisible={setSortVisible}
              visible={sortVisible}
              valueSort={valueSort}
            />
          }
          bottomHeight={BOTTOM_HEADER_HEIGHT}
          hideBottomBorder={true}
          heightShow={heightShow - 190}
          Animated={Animated}
          navigation={navigation}
          scrollAnimated={scrollAnimated}
        />
        <View style={sortStyle}>
          <SortDropDown
            visible={sortVisible}
            setVisible={setSortVisible}
            setAction={setSortAction}
            setValueSort={(value) => {
              setValueSort(value);
              _handleSort(value);
            }}
            valueSort={valueSort}
            options={PRODUCT_SORT_ITEM}
          />
        </View>

        <FlatList
          data={
            loading
              ? [0]
              : listProduct && listProduct.length
              ? listProduct
              : [0]
          }
          ListHeaderComponent={
            <HeaderList
              leftPress={leftPress}
              navigation={navigation}
              heightShow={heightShow}
              categoryId={categoriesSelect?.id}
            />
          }
          renderItem={({item, index}) => {
            return loading ? (
              <View
                style={{
                  flexDirection: 'row',
                  paddingBottom: 16,
                  flexWrap: 'wrap',
                  justifyContent: 'space-around',
                }}>
                {[1, 2, 3, 4].map((v) => (
                  <SearchProductLoading key={v} />
                ))}
              </View>
            ) : !listProduct || !listProduct.length ? (
              <NotFound />
            ) : (
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
          onEndReached={() => {
            if (loading) return;
            handleLoadMore();
          }}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </>
    </ThemeView>
  );
};

Products.defaultProps = {};

Products.propTypes = {};

export default Products;
