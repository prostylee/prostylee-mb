import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';
import i18n from 'i18n';
import Carousel from 'react-native-snap-carousel';
import {ProductLike} from 'components';
import {currencyFormat} from 'utils/currency';

const ProductSimilar = (props) => {
  const imagesRef = React.useRef();
  const data = props.data ? props.data : [];
  const selectItem = props.onSelect ? props.onSelect : () => {};
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => {
          selectItem(item.id);
        }}>
        <Image
          style={styles.relatedImage}
          resizeMode={'cover'}
          source={{uri: item.imageUrls[0]}}
        />
        <Text style={styles.relatedName}>{item.name || ''}</Text>
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
        sliderWidth={144 * data.length}
        itemWidth={144}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        containerCustomStyle={styles.carouselContainer}
      />
    </View>
  );
};

export default ProductSimilar;
