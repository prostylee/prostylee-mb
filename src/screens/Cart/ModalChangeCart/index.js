/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {RadioSelectGroup, ButtonRounded} from 'components';
import {Dimensions} from 'react-native';
import {currencyFormat} from 'utils/currency';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import i18n from 'i18n';
import {getProductById} from 'services/api/productApi';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;

const ModalChangeCart = ({images, productId}) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  console.log('producId', productId);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      getProductById(productId)
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          if (res.data.status !== 200) {
            console.log('Có lỗi xảy ra');
            return;
          }
          setProduct(res.data.data);
        })
        .catch(() => {
          setLoading(false);
          console.log('Lỗi hệ thống');
        });
    }
  }, [productId]);

  const {
    name,
    price = 0,
    imageUrls,
    productAttributeOptionResponse = [],
  } = product;

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item}}
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
          data={imageUrls}
          renderItem={renderItem}
          hasParallaxImages={true}
          scrollEnabled={true}
          enableSnap={true}
        />
        <View style={styles.wrapName}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.wrapPrice}>
          <Text numberOfLines={1} style={styles.price}>
            {currencyFormat(price, 'đ')}
          </Text>
        </View>
        {productAttributeOptionResponse.map((item) => {
          return (
            <View style={styles.wrapSize}>
              <RadioSelectGroup
                key={item.id}
                title={item.label}
                onValueChange={(value) => setValue(value, item)}
                data={item.productAttributeResponses.map((item) => {
                  return {label: item.attrValue, value: item.id};
                })}
              />
            </View>
          );
        })}

        {/* <View style={styles.wrapColor}>
          <RadioSelectGroup
            value="black"
            title={i18n.t('cart.color')}
            data={[
              {label: 'Đen', value: 'black'},
              {label: 'Trắng', value: 'white'},
            ]}
          />
        </View> */}
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
