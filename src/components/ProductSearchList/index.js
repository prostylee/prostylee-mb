import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import styles from './styles';

import {ThemeView, Header} from 'components';
import {Divider} from 'react-native-paper';

import {useDispatch} from 'react-redux';

import ProductList from './ProductList';
import SortDropDown from './SortDropDown';
import TagList from './TagList';
import FilterBar from './FilterBar';

interface ProductSearchListProps {
  title: String;
  hasTagList?: Boolean;
  hasFilterBar?: Boolean;
  getDataFunction: Function;
  refreshDataFunction: Function;
  loadmoreDataFuntion: Function;
  tagFilterFunction: Function;
  sortDataFunction?: Function;
  navigation: Object;
  getCurrentPageFunction: Function;
  isLoading: Boolean;
  hasLoadmore: Boolean;
  searchDataFunction: Function;
}
const MockSortItem = [
  {label: 'Liên quan nhất', value: 1},
  {label: 'Phổ biến nhất', value: 2},
  {label: 'Hàng mới về', value: 3},
  {label: 'Giá thấp', value: 4},
  {label: 'Giá cao nhất', value: 5},
  {label: 'Đánh giá tốt', value: 6},
];
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
}: ProductSearchListProps) => {
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
            activeSortItem={
              valueSort
                ? MockSortItem.find((v) => v.value === valueSort).label
                : ''
            }
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

ProductSearchList.defaultProps = {};

ProductSearchList.propTypes = {};

export default ProductSearchList;
