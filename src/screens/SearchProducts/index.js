import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, View, Platform} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, SortDropDown, SearchBar} from 'components';

import {Divider, Chip} from 'react-native-paper';
import {TagList} from 'components';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {debounce} from 'lodash';

import ProductList from './ProductList';

import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {getCurrentKeyword} from 'redux/selectors/search';

import GroupHeaderRightButton from './HeaderRightButton';
import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';

import {getStatusBarHeight} from 'react-native-status-bar-height';
import {userSelectors} from 'reducers';

import {rem} from 'utils/common';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOTTOM_HEADER_HEIGHT = Platform.OS === 'ios' ? 80 : 100;
const HEIGHT_HEADER = Platform.OS === 'ios' ? 78 * rem + 45 : 80 * rem + 45;

const SearchProducts = ({navigation}) => {
  const dispatch = useDispatch();
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));
  const tagListRef = React.useRef();

  const [searchQuery, setSearchQuery] = React.useState(currentKeyword);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  const [currentFilterValue, setCurrentFilterValue] = useState({});
  const [currentSortValue, setCurrentSortValue] = useState({});

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

  const handlerSearch = useCallback(
    debounce((query) => {
      dispatch(searchActions.setCurrentKeyword(query));
      dispatch(
        searchActions.getProductsSearch({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT,
          keyword: query,
          ...currentSortValue,
          ...currentFilterValue,
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
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: searchQuery,
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
    dispatch(searchActions.clearProductsFilterState());
    setCurrentFilterValue({
      ...queryObject,
    });
    setCurrentSortValue(null);
    setValueSort(null);
    dispatch(
      searchActions.getProductsSearch({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        keyword: searchQuery,
        ...queryObject,
      }),
    );
  };

  useEffect(() => {
    setSearchQuery(currentKeyword);
  }, [currentKeyword]);
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: visible ? HEIGHT : 0,
    marginTop: visible ? HEIGHT_HEADER : 0,
  };
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
          <SearchBar
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            onClear={() => onChangeSearch('')}
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
      <TagList
        ref={tagListRef}
        onTagPress={_handleFilterByTag}
        options={filterTags}
      />
      <View style={sortStyle}>
        <SortDropDown
          visible={visible}
          setVisible={setVisible}
          setAction={setAction}
          setValueSort={_handleSort}
          valueSort={valueSort}
          options={PRODUCT_SORT_ITEM}
        />
      </View>
      <ProductList
        currentFilter={currentFilterValue}
        currentSort={currentSortValue}
        navigation={navigation}
      />
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
