import React from 'react';

import {Dimensions, FlatList, View} from 'react-native';

import styles from './styles';
import Item from './item';
import {storeActions} from 'redux/reducers';
import {PAGE_DEFAULT, LIMIT_DEFAULT} from 'constants';
import {
  getBrandListLoadingSelector,
  getBrandListLoadmoreLoadingSelector,
  getBrandListCurrentPageSelector,
  getBrandListHasLoadmoreSelector,
} from 'redux/selectors/storeMain';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {BrandListLoading} from 'components/Loading/contentLoader';
import PropTypes from 'prop-types';
const ListBrand = ({selectedBrand, setSelectedBrand, data, disabled}) => {
  const HEIGHT = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const [refreshing, setIsRefreshing] = React.useState(false);

  const hasLoadmore = useSelector((state) =>
    getBrandListHasLoadmoreSelector(state),
  );
  const currentPage = useSelector((state) =>
    getBrandListCurrentPageSelector(state),
  );
  const loading = useSelector((state) => getBrandListLoadingSelector(state));
  const loadmoreLoading = useSelector((state) =>
    getBrandListLoadmoreLoadingSelector(state),
  );

  const activeBrand = selectedBrand ? selectedBrand : {};
  const setActiveBrand = setSelectedBrand ? setSelectedBrand : () => {};

  const _handleLoadmore = () => {
    if (hasLoadmore)
      dispatch(
        storeActions.getBrandListLoadmore({
          page: currentPage,
          limit: LIMIT_DEFAULT,
        }),
      );
  };
  const _handleRefresh = () => {
    setIsRefreshing(true);
    dispatch(
      storeActions.getBrandList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  };

  React.useEffect(() => {
    if (!loading) {
      setIsRefreshing(false);
    }
  }, [loading]);
  React.useEffect(() => {
    dispatch(
      storeActions.getBrandList({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);
  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        selectedBrand={activeBrand}
        onPress={() => setActiveBrand(item)}
        disabled={disabled}
      />
    );
  };

  return loading && !refreshing ? (
    <View style={{paddingTop: 16}}>
      {Array.from('x'.repeat(Math.round(HEIGHT - 120) / 130)).map(
        (v, index) => (
          <BrandListLoading height={130} key={index} />
        ),
      )}
    </View>
  ) : (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.containerContent}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      onEndReached={_handleLoadmore}
      onRefresh={_handleRefresh}
      refreshing={refreshing}
    />
  );
};

ListBrand.defaultProps = {
  selectedBrand: {},
  setSelectedBrand: () => {},
  data: [],
  disabled: false,
};

ListBrand.propTypes = {
  selectedBrand: PropTypes.object,
  setSelectedBrand: PropTypes.func,
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ListBrand;
