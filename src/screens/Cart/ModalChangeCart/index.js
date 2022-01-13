import styles from './styles';

import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, FlatList, Image} from 'react-native';
import {RadioSelectGroup, ButtonRounded} from 'components';
import {currencyFormat} from 'utils/currency';
import {CURRENCY_VIET_NAM} from 'constants';

import {useDispatch} from 'react-redux';
import {cartActions} from 'reducers';
import {ScrollView} from 'react-native-gesture-handler';
import i18n from 'i18n';
import {getProductVarient} from 'utils/product';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;

const ModalChangeCart = ({
  currentOptions,
  productId,
  closeModal,
  productData,
}) => {
  const [priceList, setPriceList] = useState({});
  const [optChosen, setOptChosen] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setOptChosen(currentOptions);
    processProductPriceData(productData.item.productPriceResponseList);
  }, [productId]);

  const processProductPriceData = (data) => {
    const attributeList = {};
    data?.map((item) => {
      const attributeValues = item.productAttributes
        .map(
          (attribute) => attribute?.productAttributeResponses?.[0]?.attrValue,
        )
        .sort();
      let attributeID = '';
      attributeValues.forEach((element) => {
        attributeID = attributeID + '_' + element;
      });
      attributeList[attributeID] = {
        price: item?.price,
        priceSale: item?.priceSale,
      };
    });
    setPriceList(attributeList);
  };

  const {name, imageUrls} = productData.item;

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
  const productVarient = getProductVarient(optChosen);
  const priceData = priceList[productVarient]
    ? priceList[productVarient]
    : null;

  const updateItemOption = () => {
    const productVarientId = getProductVarient(currentOptions);
    const newProductVarientId = getProductVarient(optChosen);
    dispatch(
      cartActions.updateItemOption({
        itemVarientId: `${productId}${productVarientId}`,
        newItemVarientId: `${productId}${newProductVarientId}`,
        newOptions: optChosen,
      }),
    );
    closeModal();
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.item,
          {
            marginLeft: index > 0 ? 10 : 0,
          },
        ]}>
        <Image source={{uri: item}} style={styles.imageContainer} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselImgs}>
        <FlatList
          style={{height: 0}}
          contentContainerStyle={styles.carouselContainer}
          keyExtractor={(item, index) => item?.id || index}
          data={imageUrls}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.993}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          snapToInterval={WIDTH_IMAGE + 10}
          renderItem={renderItem}
          getItemLayout={(_, index) => {
            return {
              length: WIDTH_IMAGE + 10,
              offset: (WIDTH_IMAGE + 10) * index,
              index,
            };
          }}
        />

        <View style={styles.wrapInfo}>
          <View style={styles.wrapName}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.wrapPrice}>
            {priceData ? (
              <Text numberOfLines={1} style={styles.price}>
                {currencyFormat(
                  priceData?.priceSale ? priceData.priceSale : priceData.price,
                  CURRENCY_VIET_NAM,
                )}
              </Text>
            ) : (
              <Text style={styles.notExist}>
                {i18n.t('productDetail.notExist')}
              </Text>
            )}
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
