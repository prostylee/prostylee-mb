import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {Colors, ListLayoutSelection} from 'components';

import ProductList from './ProductList';
import TagList from './TagList';

import {PAGE_DEFAULT, LIMIT_DEFAULT, DEFAULT_TAG} from 'constants';

import {
  getStoreAllProductCurrentPage,
  getStoreAllProductHasLoadmore,
  getStoreAllProductLoadmoreLoadingSelector,
  getStoreInfoSelector,
} from 'redux/selectors/storeProfile';

import {storeProfileActions} from 'redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

const AllProducts = ({
  navigation,
  isEndReached = false,
  setIsEndReached = () => {},
  setHasLoadmore = () => {},
  setFilterValue = () => {},
  setValueSort = () => {},
  filterValue = {},
  valueSort = {},
}) => {
  const dispatch = useDispatch();
  const route = useRoute();
  const storeId = route?.params?.storeId || 1;

  const storeInfo = useSelector((state) => getStoreInfoSelector(state));

  const storeCategories =
    storeInfo?.categoryResponseLites && storeInfo?.categoryResponseLites?.length
      ? storeInfo?.categoryResponseLites
      : [];

  const [filterTags, setFilterTags] = useState(storeCategories);
  const [layout, setLayout] = useState('full');

  useEffect(() => {
    if (
      storeInfo?.categoryResponseLites &&
      storeInfo?.categoryResponseLites?.length
    ) {
      setFilterTags([DEFAULT_TAG, ...storeInfo?.categoryResponseLites]);
    }
  }, [storeInfo]);

  const hasLoadMore = useSelector((state) =>
    getStoreAllProductHasLoadmore(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getStoreAllProductLoadmoreLoadingSelector(state),
  );
  const page = useSelector((state) => getStoreAllProductCurrentPage(state));

  const Footer = () => {
    return (
      <View style={styles.viewFooter}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  const _handleLoadMore = () => {
    if (hasLoadMore && !loadmoreLoading) {
      dispatch(
        storeProfileActions.getAllStoreProductLoadmore({
          limit: LIMIT_DEFAULT,
          page: page,
          ...filterValue,
          ...valueSort,
          storeId: storeId,
        }),
      );
    }
  };
  const _handleFilterByTag = (queryObject) => {
    setFilterValue(queryObject);
    setValueSort(null);
    dispatch(storeProfileActions.clearStoreProfileFilterState());
    dispatch(
      storeProfileActions.getAllStoreProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
        storeId: storeId,
      }),
    );
  };
  useEffect(() => {
    if (isEndReached) {
      _handleLoadMore();
    }
  }, [isEndReached]);
  useEffect(() => {
    setHasLoadmore(hasLoadMore);
  });
  useEffect(() => {
    if (!loadmoreLoading) {
      setIsEndReached(false);
    }
  }, [loadmoreLoading]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{i18n.t('stores.allProduct')}</Text>
        <ListLayoutSelection
          value={layout}
          leftAction={() => setLayout('grid')}
          rightAction={() => setLayout('full')}
        />
      </View>
      <TagList onTagPress={_handleFilterByTag} options={filterTags} />
      <ProductList navigation={navigation} layout={layout} />
      {loadmoreLoading ? <Footer /> : null}
    </View>
  );
};

AllProducts.defaultProps = {};

AllProducts.propTypes = {};

export default AllProducts;
