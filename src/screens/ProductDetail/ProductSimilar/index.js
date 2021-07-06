import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';

/*Translates*/
import i18n from 'i18n';

/*Components*/
import Carousel from 'react-native-snap-carousel';
import {ProductLike} from 'components';

/*Utils*/
import {currencyFormat} from 'utils/currency';

/*Proptypes*/
import PropTypes from 'prop-types';
const WIDTH = Dimensions.get('window').width;
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
              {currencyFormat(item?.priceSale || 0, 'đ')}
            </Text>
            <Text style={styles.relatedPrice}>
              {currencyFormat(item?.price || 0, 'đ')}
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
      <Carousel
        ref={imagesRef}
        data={data}
        activeSlideAlignment={'start'}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={144}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        containerCustomStyle={styles.carouselContainer}
        keyExtractor={(item, index) => item?.id || index}
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
