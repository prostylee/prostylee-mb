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

import {Chip} from 'react-native-paper';
import {Colors} from 'components';

import {MessageOutlined, Bell, BellWithNotiBadge} from 'svg/header';
import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';

import {
  getStoreAllProductCurrentPage,
  getStoreAllProductHasLoadmore,
  getStoreAllProductLoadmoreLoadingSelector,
} from 'redux/selectors/storeProfile';

import {storeProfileActions} from 'redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
import TagList from './TagList';

const AllProducts = ({
  navigation,
  isEndReached = false,
  setIsEndReached = () => {},
  setHasLoadmore = () => {},
}) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const hasLoadMore = useSelector((state) =>
    getStoreAllProductHasLoadmore(state),
  );

  const loadmoreLoading = useSelector((state) =>
    getStoreAllProductLoadmoreLoadingSelector(state),
  );
  const page = useSelector((state) => getStoreAllProductCurrentPage(state));

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const Footer = () => {
    return (
      <View style={styles.viewFooter}>
        <ActivityIndicator animating color={Colors.$purple} size="small" />
      </View>
    );
  };
  const _handleLoadMore = () => {
    dispatch(
      storeProfileActions.getAllStoreProductLoadmore({
        limit: LIMIT_DEFAULT,
        page: page,
        storeId: 1,
      }),
    );
    setIsEndReached(false);
  };
  const _handleFilterByTag = (queryObject) => {
    dispatch(
      storeProfileActions.getAllStoreProduct({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
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
      <Text style={styles.title}>Tất cả sản phẩm</Text>
      <TagList onTagPress={_handleFilterByTag} />
      <ProductList />
      {loadmoreLoading ? <Footer /> : null}
    </View>
  );
};

AllProducts.defaultProps = {};

AllProducts.propTypes = {};

export default AllProducts;
