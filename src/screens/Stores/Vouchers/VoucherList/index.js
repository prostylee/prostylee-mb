import React from 'react';
import {View, FlatList, Text} from 'react-native';

import styles from './styles';

import ProductItem from './VoucherItem';

const VoucherList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listWrapper}
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={({item, index}) => (
          <ProductItem item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

VoucherList.defaultProps = {};

VoucherList.propTypes = {};

export default React.memo(VoucherList);
