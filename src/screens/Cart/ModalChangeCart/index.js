import styles from './styles';

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {RadioSelectGroup, ButtonRounded} from 'components';
import {Dimensions} from 'react-native';
import {currencyFormat} from 'utils/currency';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

import {useDispatch} from 'react-redux';
import {getProductById} from 'services/api/productApi';
import {cartActions} from 'reducers';
import {ScrollView} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
import {getProductPrice} from 'utils/product';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;

const ModalChangeCart = ({
  currentOptions,
  productId,
  closeModal,
  productData,
}) => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [optChosen, setOptChosen] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setOptChosen(currentOptions);
    if (productId) {
      getProductById(productId)
        .then((res) => {
          setLoading(false);
          if (res.data.status !== 200) {
            return;
          }
          setProduct(res.data.data);
        })
        .catch(() => {
          showMessage({
            message: i18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
          setLoading(false);
        });
    }
  }, [productId]);

  const {name, price = 0, imageUrls} = product;

  const onChangeValue = (vl, item) => {
    const changeOptionIndex = optChosen.findIndex(
      (option) => option.id === item.id,
    );
    const changeOption = optChosen.find((option) => option.id === item.id);
    const selectedNewValue = changeOption.productAttributeResponses.find(
      (option) => option.id === vl,
    );
    const newChangeOption = Object.assign({}, changeOption);
    newChangeOption.value = selectedNewValue;
    setOptChosen((prev) => {
      const newOptionList = [
        ...prev.slice(0, changeOptionIndex),
        newChangeOption,
        ...prev.slice(changeOptionIndex + 1),
      ];
      return newOptionList;
    });
  };
  const priceData = getProductPrice(productData);

  const updateItemOption = () => {
    dispatch(
      cartActions.updateItemOption({
        itemId: productId,
        newOptions: optChosen,
      }),
    );
    closeModal();
  };

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
        <View style={{flex: 1}}>
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
        </View>

        <View style={styles.wrapInfo}>
          <View style={styles.wrapName}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.wrapPrice}>
            <Text numberOfLines={1} style={styles.price}>
              {currencyFormat(
                priceData?.priceSale ? priceData.priceSale : priceData.price,
                'đ',
              )}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={styles.attributeListInner}
            style={styles.attributeListContainer}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {currentOptions.map((item) => {
              return (
                <View style={styles.wrapSize} key={item.id}>
                  <RadioSelectGroup
                    key={item.id}
                    title={item.label}
                    defaultValue={item.value.id}
                    onChange={(value) => onChangeValue(value, item)}
                    data={item.productAttributeResponses.map((opt) => {
                      return {label: opt.attrValue, value: opt.id};
                    })}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.wrapCheckout}>
          <ButtonRounded
            label={i18n.t('cart.updateProduct')}
            style={styles.btnCheckout}
            titleStyle={styles.titleStyle}
            onPress={updateItemOption}
          />
        </View>
      </View>
    </View>
  );
};

ModalChangeCart.defaultProps = {};

ModalChangeCart.propTypes = {};

export default ModalChangeCart;
