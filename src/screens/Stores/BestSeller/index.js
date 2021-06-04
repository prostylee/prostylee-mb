import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';

import styles from './styles';
import {Sort, Filter, CaretDown} from 'svg/common';
import {ThemeView, Header, TextInputRounded} from 'components';
import {Divider, Chip} from 'react-native-paper';
import {Colors} from 'components';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {useDispatch} from 'react-redux';
import {storeActions} from 'redux/reducers';

import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import TagList from './TagList';
import FilterBar from './FilterBar';

const BestSellers = ({navigation}) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const _handleSort = (value) => {
    setValueSort(value);
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
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };

  const _handleFilterByTag = (queryObject) => {
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      storeActions.getBestSellers({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
      }),
    );
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 10,
          borderBottomWidth: 0,
          borderBottomWidth: 1,
        }}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Tất cả sản phẩm
          </Text>
        }
      />
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        navigation={navigation}
      />
      <Divider />
      <TagList onTagPress={_handleFilterByTag} />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={_handleSort}
        valueSort={valueSort}
      />
      <ProductList />
    </ThemeView>
  );
};

BestSellers.defaultProps = {};

BestSellers.propTypes = {};

export default BestSellers;
