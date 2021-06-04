import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './ProductItem';

const ProductList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
        numColumns={1}
        renderItem={({item, index}) => (
          <ProductItem item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default React.memo(ProductList);
