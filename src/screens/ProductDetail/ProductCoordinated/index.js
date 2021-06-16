import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';

/*Translate*/
import i18n from 'i18n';

/*Components*/
import ProductItem from './ProductItem';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductSimilar = ({data, onSelect}) => {
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
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wrapProduct}>
              <ProductItem index={index} item={item} onSelect={onSelect} />
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

ProductSimilar.defaultProps = {
  data: [],
  onSelect: () => {},
};

ProductSimilar.PropType = {
  onSelect: PropTypes.func,
};

export default ProductSimilar;
