import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text, FlatList} from 'react-native';

/*Translate*/
import i18n from 'i18n';

/*Components*/
import ProductItem from './ProductItem';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductCoordinated = ({data, onSelect}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {i18n.t('productDetail.productViewedRecently')}
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
      <View style={styles.listContainer}>
        {data && data?.length
          ? data.map((item, index) => (
              <View style={styles.wrapProduct} key={item?.id || index}>
                <ProductItem index={index} item={item} onSelect={onSelect} />
              </View>
            ))
          : null}
      </View>
    </View>
  );
};

ProductCoordinated.defaultProps = {
  data: [],
  onSelect: () => {},
};

ProductCoordinated.propTypes = {
  onSelect: PropTypes.func,
};

export default ProductCoordinated;
