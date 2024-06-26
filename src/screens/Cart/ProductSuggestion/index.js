import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import ProductItem from './ProductItem';

import {cartActions} from 'reducers';

import {
  getSuggestionLoadingSelector,
  getListSuggestionSelector,
} from 'redux/selectors/cart';

const ProductSimilar = (props) => {
  const loading = useSelector((state) => getSuggestionLoadingSelector(state));
  const suggestionList = useSelector((state) =>
    getListSuggestionSelector(state),
  );

  if (suggestionList && !suggestionList.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{i18n.t('cart.forYou')}</Text>
        {/* <TouchableOpacity style={styles.listMore} onPress={() => {}}>
          <Text style={styles.listMoreText}>{i18n.t('cart.seeMore')}</Text>
          <IonIcons
            name={'ios-chevron-forward'}
            size={18}
            color={colors['$purple']}
            style={styles.iconContainer}
          />
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={suggestionList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wrapProduct}>
              <ProductItem index={index} item={item} />
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
