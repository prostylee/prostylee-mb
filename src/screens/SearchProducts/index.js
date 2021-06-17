import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, KeyboardAvoidingView} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, Container} from 'components';
import SearchBar from 'components/SearchBar';
import {Searchbar, Divider, Chip} from 'react-native-paper';
import {Colors} from 'components';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {debounce} from 'lodash';

import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {getCurrentKeyword} from 'redux/selectors/search';
import TagList from './TagList';
import GroupHeaderRightButton from './HeaderRightButton';
import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';

const SearchProducts = ({navigation}) => {
  const dispatch = useDispatch();
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));

  const [searchQuery, setSearchQuery] = React.useState(currentKeyword);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  const [currentFilterValue, setCurrentFilterValue] = useState({});
  const [currentSortValue, setCurrentSortValue] = useState({});

  const handlerSearch = useCallback(
    debounce((query) => {
      dispatch(
        searchActions.getProductsSearch({
          keyword: query,
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          sorts: 'name',
        }),
      );
    }, 1000),
    [],
  );
  const _handleSort = (value) => {
    setValueSort(value);
    setVisible(false);
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
    setCurrentSortValue({
      ...sortOption,
    });
    dispatch(
      searchActions.getProductsSearch({
        keyword: searchQuery,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...sortOption,
        ...currentFilterValue,
      }),
    );
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
    dispatch(searchActions.setProductsSearchLoading(true));
  };
  const _handleFilterByTag = (queryObject) => {
    setCurrentFilterValue({
      ...queryObject,
    });
    dispatch(
      searchActions.getProductsSearch({
        keyword: searchQuery,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
        ...currentSortValue,
      }),
    );
  };

  useEffect(() => {
    setSearchQuery(currentKeyword);
  }, [currentKeyword]);

  return (
    <ThemeView style={styles.container}>
      <Header
        isDefault
        containerStyle={{
          paddingBottom: 5,
          borderBottomWidth: 0,
        }}
        leftStyle={{
          height: 30,
        }}
        middleComponent={
          // <Searchbar
          //   style={styles.searchStyle}
          //   inputStyle={styles.searchInputStyle}
          //   multiline={false}
          //   placeholder={i18n.t('Search.inputPlaceholder')}
          //   onChangeText={onChangeSearch}
          //   value={searchQuery}
          //   defaultValue={searchQuery}
          // />
          <SearchBar
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            defaultValue={searchQuery}
            style={styles.searchStyle}
          />
        }
        rightComponent={<GroupHeaderRightButton haveNoti={true} />}
      />
      <FilterBar
        setVisible={setVisible}
        visible={visible}
        navigation={navigation}
        sortActiveItem={
          valueSort
            ? PRODUCT_SORT_ITEM.find((v) => v.value === valueSort).label
            : ''
        }
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
      <ProductList
        currentFilterValue={currentFilterValue}
        navigation={navigation}
      />
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
