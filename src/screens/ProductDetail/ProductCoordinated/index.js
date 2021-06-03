import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from './ProductItem';

import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

const ProductSimilar = (props) => {
  const {colors} = useTheme();
  const listProduct = props.data ? props.data : [];
  const selectItem = props.onSelect ? props.onSelect : () => {};
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {i18n.t('productDetail.productCoordinated')}
        </Text>
        <TouchableOpacity style={styles.listMore} onPress={() => {}}>
          {/* <Text style={styles.listMoreText}>
            {i18n.t('productDetail.seeMore')}
          </Text>
          <IonIcons
            name={'ios-chevron-forward'}
            size={18}
            color={colors['$purple']}
            style={styles.iconContainer}
          /> */}
        </TouchableOpacity>
      </View>
      <FlatList
        data={listProduct}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wrapProduct}>
              <ProductItem index={index} item={item} onSelect={selectItem} />
            </View>
          );
        }}
        numColumns={2}
        scrollEventThrottle={1}
        keyExtractor={(_, index) => `coordinated_product_${index}`}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductSimilar;
