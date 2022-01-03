import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native';

/*Translates*/
import i18n from 'i18n';
import {CURRENCY_VIET_NAM} from 'constants';

/*Components*/
import {ProductLike} from 'components';

/*Utils*/
import {currencyFormat} from 'utils/currency';

/*Proptypes*/
import PropTypes from 'prop-types';
const ProductSimilar = ({data, onSelect}) => {
  const imagesRef = React.useRef();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        key={item?.id}
        onPress={() => {
          onSelect(item.id);
        }}>
        <Image
          style={styles.relatedImage}
          resizeMode={'cover'}
          source={{uri: item.imageUrls[0]}}
        />
        <Text style={styles.relatedName} numberOfLines={2}>
          {item.name || ''}
        </Text>
        <View style={styles.relatedInfo}>
          <View style={styles.relatedPriceGroup}>
            <Text style={styles.relatedPriceSale}>
              {currencyFormat(item?.priceSale || 0, CURRENCY_VIET_NAM)}
            </Text>
            <Text style={styles.relatedPrice}>
              {currencyFormat(item?.price || 0, CURRENCY_VIET_NAM)}
            </Text>
          </View>
          <View style={styles.likeButton}>
            <TouchableOpacity style={styles.likeButtonStyle}>
              <ProductLike item={item} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {i18n.t('productDetail.similarProduct')}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={styles.carouselContainer}
        ref={imagesRef}
        keyExtractor={(item, index) => item?.id || index}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0.993}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        snapToInterval={144}
        renderItem={renderItem}
        getItemLayout={(_, index) => {
          return {length: 144, offset: 144 * index, index};
        }}
      />
    </View>
  );
};

ProductSimilar.defaultProps = {
  data: [],
  onSelect: () => {},
};

ProductSimilar.propTypes = {
  data: PropTypes.array,
  onSelect: PropTypes.func,
};

export default ProductSimilar;
