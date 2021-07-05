import React, {useCallback, useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import i18n from 'i18n';
import styles from './styles';

import {Colors, TagList} from 'components';

import ProductList from './ProductList';

import {PAGE_DEFAULT, LIMIT_DEFAULT, FILTER_TAGS} from 'constants';

import {
  getStoreAllProductCurrentPage,
  getStoreAllProductHasLoadmore,
  getStoreAllProductLoadmoreLoadingSelector,
} from 'redux/selectors/storeProfile';

import {storeProfileActions} from 'redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {isNull} from 'lodash-es';
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

  const location = useSelector((state) => userSelectors.getUserLocation(state));

  const [filterTags, setFilterTags] = useState([
    {
      label: 'Gần đây',
      value: {
        latitude: location?.lat || 10.806406363857086,
        longitude: location?.lon || 106.6634168400805,
      },
    },
    {
      label: 'Best-seller',
      value: {
        bestSeller: true,
      },
    },

    {
      label: 'Sale',
      value: {
        sale: true,
      },
    },
  ]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      setFilterTags([
        {
          label: 'Gần đây',
          value: {
            latitude: location?.lat,
            longitude: location?.lon,
          },
        },
        {
          label: 'Best-seller',
          value: {
            bestSeller: true,
          },
        },

        {
          label: 'Sale',
          value: {
            sale: true,
          },
        },
      ]);
    }
  }, [location?.lat, location?.lon]);

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
    if (!loadmoreLoading) {
      dispatch(
        storeProfileActions.getAllStoreProductLoadmore({
          limit: LIMIT_DEFAULT,
          page: page,
          ...filterValue,
          ...valueSort,
          storeId: storeId,
        }),
      );
      setIsEndReached(false);
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('stores.allProduct')}</Text>
      <TagList onTagPress={_handleFilterByTag} options={filterTags} />
      <ProductList />
      {loadmoreLoading ? <Footer /> : null}
    </View>
  );
};

AllProducts.defaultProps = {};

AllProducts.propTypes = {};

export default AllProducts;
