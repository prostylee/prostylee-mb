import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from './style';
import ProductItem from './ProductItem';

const ProductList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        {/* {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
          return <ProductItem item={item} index={index} />;
        })} */}
        <FlatList
          numColumns={2}
          data={[1, 2, 3, 4, 5, 6, 7]}
          renderItem={({item, index}) => (
            <ProductItem item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

ProductList.defaultProps = {};

ProductList.propTypes = {};

export default ProductList;
