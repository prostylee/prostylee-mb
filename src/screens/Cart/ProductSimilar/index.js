import styles from './styles';
import React from 'react';
import {useSelector} from 'react-redux';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import i18n from 'i18n';
import {currencyFormat} from 'utils/currency';
import {Heart, HeartFill} from 'svg/common';

import {getListRecentSelector} from 'redux/selectors/cart';
import {useNavigation} from '@react-navigation/native';
const WIDTH = Dimensions.get('window').width;

const ProductSimilar = (props) => {
  const navigation = useNavigation();
  const imagesRef = React.useRef();
  //const selectItem = props.onSelect ? props.onSelect : () => {};

  //const loading = useSelector((state) => getRecentLoadingSelector(state));
  const recentList = useSelector((state) => getListRecentSelector(state));

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => {
          navigation.navigate('ProductDetail', {id: item.id});
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
              {item.likeStatusOfUserLogin ? <HeartFill /> : <Heart />}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{i18n.t('cart.similarProduct')}</Text>
      </View>
      <Carousel
        ref={imagesRef}
        data={recentList}
        activeSlideAlignment={'start'}
        renderItem={renderItem}
        sliderWidth={WIDTH}
        itemWidth={144}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        containerCustomStyle={styles.carouselContainer}
      />
    </View>
  );
};

ProductSimilar.defaultProps = {};

export default ProductSimilar;
