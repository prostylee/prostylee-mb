import React, {useEffect, useState} from 'react';
import {Text, Dimensions, View, Platform} from 'react-native';

import {ThemeView, Header, SortDropDown, TagList} from 'components';
import {Divider} from 'react-native-paper';

import ProductList from './ProductList';

import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';
import styles from './styles';
import PropTypes from 'prop-types';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {userSelectors} from 'reducers';

import {useSelector} from 'react-redux';
import {rem} from 'utils/common';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const HEIGHT_HEADER = Platform.OS === 'ios' ? 78 * rem + 45 : 80 * rem + 45;

const ProductSearchList = ({
  title,
  navigation,
  hasTagList,
  hasFilterBar,
  getDataFunction,
  refreshDataFunction,
  loadmoreDataFuntion,
  isLoading,
  hasLoadmore,
  tagFilterFunction,
  sortDataFunction,
  getFilterStateSelectorFunction,
}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);
  const tagListRef = React.useRef();

  const location = useSelector((state) => userSelectors.getUserLocation(state));

  const [filterTags, setFilterTags] = useState([
    {
      label: 'Best-seller',
      value: {
        bestSeller: true,
      },
    },
    {
      label: 'Gần đây',
      value: {
        latitude: location?.lat || 10.806406363857086,
        longitude: location?.lon || 106.6634168400805,
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
          label: 'Best-seller',
          value: {
            bestSeller: true,
          },
        },
        {
          label: 'Gần đây',
          value: {
            latitude: location?.lat,
            longitude: location?.lon,
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

  useEffect(() => {
    refreshDataFunction();
  }, []);

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
      case 6: {
        sortOption.bestRating = true;
        break;
      }
      default: {
        break;
      }
    }
    return sortOption;
  };

  const _handleSort = (value) => {
    setValueSort(value);
    if (tagListRef && tagListRef.current && tagListRef.current.active) {
      sortDataFunction(value, tagListRef.current.active.value);
      return;
    }
    sortDataFunction(value);
  };
  const sortStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    width: WIDTH,
    height: visible ? HEIGHT : 0,
    marginTop: visible ? HEIGHT_HEADER : 0,
  };
  const _handleLoadMore = () => {
    loadmoreDataFuntion(
      tagListRef?.current?.active?.value,
      formatSortValue(valueSort),
    );
  };
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
        title={title || ''}
      />
      {hasFilterBar ? (
        <>
          <FilterBar
            setVisible={setVisible}
            visible={visible}
            navigation={navigation}
            activeSortItem={
              valueSort
                ? PRODUCT_SORT_ITEM.find((v) => v.value === valueSort).label
                : ''
            }
            getFilterStateSelectorFunction={getFilterStateSelectorFunction}
          />
          <Divider />
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
        </>
      ) : null}

      {hasTagList ? (
        <TagList
          ref={tagListRef}
          onTagPress={(value) => {
            tagFilterFunction(value);
            setValueSort(null);
          }}
          options={filterTags}
        />
      ) : null}

      <ProductList
        getDataFunction={getDataFunction}
        refreshDataFunction={refreshDataFunction}
        loadmoreDataFuntion={_handleLoadMore}
        isLoading={isLoading}
        hasLoadmore={hasLoadmore}
        navigation={navigation}
      />
    </ThemeView>
  );
};

ProductSearchList.defaultProps = {
  title: '',
  hasTagList: false,
  hasFilterBar: false,
  getDataFunction: () => {},
  refreshDataFunction: () => {},
  loadmoreDataFuntion: () => {},
  tagFilterFunction: () => {},
  sortDataFunction: () => {},
  navigation: {},
  getCurrentPageFunction: () => {},
  isLoading: false,
  hasLoadmore: false,
  searchDataFunction: () => {},
  getFilterStateSelectorFunction: () => {},
};

ProductSearchList.propTypes = {
  title: PropTypes.string.isRequired,
  hasTagList: PropTypes.bool,
  hasFilterBar: PropTypes.bool,
  getDataFunction: PropTypes.func.isRequired,
  refreshDataFunction: PropTypes.func.isRequired,
  loadmoreDataFuntion: PropTypes.func.isRequired,
  tagFilterFunction: PropTypes.func,
  sortDataFunction: PropTypes.func,
  navigation: PropTypes.object,
  getCurrentPageFunction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasLoadmore: PropTypes.bool,
  searchDataFunction: PropTypes.func,
  getFilterStateSelectorFunction: PropTypes.func,
};

export default ProductSearchList;
