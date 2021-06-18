import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import {ThemeView, Header} from 'components';
import {Divider} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import TagList from './TagList';
import FilterBar from './FilterBar';
import {PRODUCT_SORT_ITEM} from 'constants';
import styles from './styles';
import PropTypes from 'prop-types';

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
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('filter');
  const [valueSort, setValueSort] = useState(null);

  useEffect(() => {
    refreshDataFunction();
  }, []);
  const _handleSort = (value) => {
    setValueSort(value);
    sortDataFunction(value);
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
          <SortDropDown
            visible={visible}
            setVisible={setVisible}
            setAction={setAction}
            setValueSort={_handleSort}
            valueSort={valueSort}
          />
        </>
      ) : null}

      {hasTagList ? <TagList onTagPress={tagFilterFunction} /> : null}

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
