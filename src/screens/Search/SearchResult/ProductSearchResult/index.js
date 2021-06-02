import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import ResultProductSearchResult from './ResultProductSearchResult';
import FeaturedProductSearchResult from './FeaturedProductSearchResult';
import { useDispatch,useSelector } from 'react-redux';
import {
  
  getStoreSearchListSelector,
} from 'redux/selectors/search/storeSearch';

const ProductSearchResult = ({navigation}) => {
  const listProduct = useSelector((state) => getStoreSearchListSelector(state));
  return (
    <View style={styles.container}>
      <ResultProductSearchResult navigation={navigation} />
      <FeaturedProductSearchResult navigation={navigation} />
    </View>
  );
};

ProductSearchResult.defaultProps = {};

ProductSearchResult.propTypes = {};

export default ProductSearchResult;
