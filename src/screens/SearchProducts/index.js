import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import i18n from 'i18n';

import styles from './styles';
import {Sort, Filter, CaretDown} from 'svg/common';
import {ThemeView, Header} from 'components';
import {Searchbar, Divider, Chip} from 'react-native-paper';
import {Colors} from 'components';

import {LIMIT_DEFAULT, PAGE_DEFAULT} from 'constants';

import {debounce} from 'lodash';
import {MessageOutlined, Bell, BellWithNotiBadge} from 'svg/header';
import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import {useDispatch, useSelector} from 'react-redux';
import {searchActions} from 'redux/reducers';
import {getCurrentKeyword} from 'redux/selectors/search';
import {getProductSearchListSelector} from 'redux/selectors/search/productSearchMain';

const MockTag = [
  {
    label: 'Best seller',
    value: {
      bestSeller: true,
    },
  },
  {
    label: 'Gần đây',
    value: {
      latitude: 10.806406363857086,
      longitude: 106.6634168400805,
    },
  },
  {
    label: 'Sale',
    value: {
      sale: true,
    },
  },
];
const WIDTH = Dimensions.get('window').width;
const GroupHeaderRightButton = ({haveNoti = false}) => {
  return (
    <View style={styles.headerGroupButtonRight}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MessageOutlined
          width={20}
          height={20}
          color={Colors['$lightGray']}
          strokeWidth={2}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {haveNoti ? (
          <BellWithNotiBadge
            width={24}
            height={24}
            color={Colors['$lightGray']}
            strokeWidth={2}
          />
        ) : (
          <Bell
            width={24}
            height={24}
            color={Colors['$lightGray']}
            strokeWidth={2}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
const TagList = ({onTagPress}) => {
  const [active, setActive] = useState(null);
  return (
    <View style={styles.wrapList}>
      <FlatList
        style={styles.wrapChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MockTag}
        renderItem={({item, index}) => (
          <Chip
            selectedColor={Colors?.['$purple']}
            selected={index === active}
            small
            onPress={() => {
              setActive(index);
              onTagPress(item.value);
            }}
            style={styles.itemChips}
            key={`${item.label}-${index}`}>
            {item.label}
          </Chip>
        )}
      />
    </View>
  );
};

const SearchProducts = ({navigation}) => {
  const dispatch = useDispatch();
  const currentKeyword = useSelector((state) => getCurrentKeyword(state));

  const [searchQuery, setSearchQuery] = React.useState(currentKeyword);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  console.log('RERENDER ');
  const searchResults = useSelector((state) =>
    getProductSearchListSelector(state),
  );
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
      searchActions.getProductsSearch({
        keyword: searchQuery,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        sorts: 'name',
        ...sortOption,
      }),
    );
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    handlerSearch(query);
  };
  const _handleFilterByTag = (queryObject) => {
    dispatch(
      searchActions.getProductsSearch({
        keyword: searchQuery,
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        ...queryObject,
      }),
    );
  };

  useEffect(() => {
    setSearchQuery(currentKeyword);
    // dispatch(
    //   searchActions.getFeaturedProductSearch({
    //     keyword: currentKeyword,
    //     // type: 'product',
    //     page: PAGE_DEFAULT,
    //     limit: LIMIT_DEFAULT,
    //   }),
    // );
  }, [currentKeyword]);

  return (
    <ThemeView style={styles.container} isFullView>
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
          <Searchbar
            style={{
              minWidth: WIDTH - 140,
              backgroundColor: '#F4F5F5',
              height: 35,
              borderRadius: 4,
              elevation: 0,
              padding: 0,
            }}
            inputStyle={{
              height: 35,
              fontSize: 14,
              lineHeight: 18,
              elevation: 0,
            }}
            placeholder={i18n.t('Search.inputPlaceholder')}
            onChangeText={onChangeSearch}
            value={searchQuery}
            defaultValue={searchQuery}
          />
        }
        rightComponent={<GroupHeaderRightButton haveNoti={true} />}
      />
      <View style={styles.wrapBlockOne}>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <View style={styles.contentBlockOne}>
            <View>
              <Sort />
            </View>
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('sort')}
            </Text>
            <View>
              <CaretDown />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SearchProductFilter')}>
          <View style={styles.wrapBlockFilter}>
            <Text numberOfLines={1} style={styles.textSpace}>
              |
            </Text>
            <Filter />
            <Text numberOfLines={1} style={styles.textSort}>
              {i18n.t('filter')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
      <TagList onTagPress={_handleFilterByTag} />
      <SortDropDown
        visible={visible}
        setVisible={setVisible}
        setAction={setAction}
        setValueSort={_handleSort}
        valueSort={valueSort}
      />
      <ProductList data={searchResults} />
    </ThemeView>
  );
};

SearchProducts.defaultProps = {};

SearchProducts.propTypes = {};

export default SearchProducts;
