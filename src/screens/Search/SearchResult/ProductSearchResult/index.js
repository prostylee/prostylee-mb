import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './styles';
import ResultProductSearchResult from './ResultProductSearchResult';
import FeaturedProductSearchResult from './FeaturedProductSearchResult';

const ProductSearchResult = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ResultProductSearchResult />
      <FeaturedProductSearchResult />
    </View>
  );
};

ProductSearchResult.defaultProps = {};

ProductSearchResult.propTypes = {};

export default ProductSearchResult;
