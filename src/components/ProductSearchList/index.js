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

import useLocation from 'hooks/useLocation';
import {useSelector} from 'react-redux';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const BOTTOM_HEADER_HEIGHT = Platform.OS === 'ios' ? 80 : 60;
const HEIGHT_HEADER = BOTTOM_HEADER_HEIGHT / 2 + 50 + getStatusBarHeight();

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
  filterDispatchAction,
  setFilterStateAction,
  clearFilterStateAction,
}) => {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

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
    if (location.lat && location.lon) {
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
  const _handleSort = (value) => {
    setValueSort(value);
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
            {title ? title : ''}
          </Text>
        }
      />
      {hasFilterBar ? (
        <>
          <FilterBar
            setVisible={setVisible}
            visible={visible}
            navigation={navigation}
            filterDispatchAction={filterDispatchAction}
            activeSortItem={
              valueSort
                ? PRODUCT_SORT_ITEM.find((v) => v.value === valueSort).label
                : ''
            }
            getFilterStateSelectorFunction={getFilterStateSelectorFunction}
            setFilterStateAction={setFilterStateAction}
            clearFilterStateAction={clearFilterStateAction}
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
        <TagList onTagPress={tagFilterFunction} options={filterTags} />
      ) : null}

      <ProductList
        getDataFunction={getDataFunction}
        refreshDataFunction={refreshDataFunction}
        loadmoreDataFuntion={loadmoreDataFuntion}
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
  filterDispatchAction: () => {},
  setFilterStateAction: {},
  clearFilterStateAction: {},
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
  navigation: PropTypes.object.isRequired,
  getCurrentPageFunction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  hasLoadmore: PropTypes.bool,
  searchDataFunction: PropTypes.func,
  getFilterStateSelectorFunction: PropTypes.func,
  filterDispatchAction: PropTypes.object,
  setFilterStateAction: PropTypes.object,
  clearFilterStateAction: PropTypes.object,
};

export default ProductSearchList;
