/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import {RadioSelectGroup, ButtonRounded} from 'components';
import {Dimensions} from 'react-native';
import {currencyFormat} from 'utils/currency';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;

const ModalChangeCart = ({images}) => {
  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.thumbnail}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.carouselImgs}>
        <Carousel
          sliderWidth={width}
          sliderHeight={width}
          itemWidth={WIDTH_IMAGE}
          data={images}
          renderItem={renderItem}
          hasParallaxImages={true}
          scrollEnabled={true}
          enableSnap={true}
        />
        <View style={styles.wrapName}>
          <Text style={styles.name}>Áo nỉ hoodie trơn đủ màu unisex</Text>
        </View>
        <View style={styles.wrapPrice}>
          <Text numberOfLines={1} style={styles.price}>
            {currencyFormat(9999999, 'đ')}
          </Text>
        </View>
        <View style={styles.wrapSize}>
          <RadioSelectGroup
            value="black"
            title={i18n.t('cart.size')}
            data={[
              {label: 'S', value: 's'},
              {label: 'M', value: 'm'},
              {label: 'L', value: 'l'},
              {label: 'XL', value: 'xl'},
            ]}
          />
        </View>
        <View style={styles.wrapColor}>
          <RadioSelectGroup
            value="black"
            title={i18n.t('cart.color')}
            data={[
              {label: 'Đen', value: 'black'},
              {label: 'Trắng', value: 'white'},
            ]}
          />
        </View>
        <View style={styles.wrapCheckout}>
          <ButtonRounded
            label={i18n.t('cart.updateProduct')}
            style={styles.btnCheckout}
            titleStyle={styles.titleStyle}
            onPress={() => console.log('pressed')}
          />
        </View>
      </View>
    </View>
  );
};

ModalChangeCart.defaultProps = {
  images: [
    {
      id: 'WpIAc9by5iU',
      thumbnail: 'https://mai.wedding/wp-content/uploads/2020/12/IMG_1122.jpg',
      title: 'Led Zeppelin - Stairway To Heaven',
    },
    {
      id: 'sNPnbI1arSE',
      thumbnail: 'https://img.youtube.com/vi/sNPnbI1arSE/hqdefault.jpg',
      title: 'Eminem - My Name Is',
    },
    {
      id: 'VOgFZfRVaww',
      thumbnail: 'https://img.youtube.com/vi/VOgFZfRVaww/hqdefault.jpg',
      title: '',
    },
  ],
};

ModalChangeCart.propTypes = {};

export default ModalChangeCart;
