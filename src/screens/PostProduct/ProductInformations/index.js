import React, {useEffect, useRef, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
} from 'react-native';
import i18n from 'i18n';
import {ProgressBar} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';

import styles from './styles';

import {postProductActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import ModalSelectAttributes from './ModalSelectAttributes';
import IconFont from 'react-native-vector-icons/FontAwesome';

import {getNumberWidthDot} from 'utils/currency';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  getListAttributesSelector,
  getListAttributesLoadingSelector,
  getPostProductInfoSelector,
} from 'redux/selectors/postProduct';

import {rem} from 'utils/common';
const HEIGHT_HEADER = Platform.OS === 'ios' ? 78 * rem + 45 : 80 * rem + 45;
const HEIGHT = Dimensions.get('window').height;
const ProductInfor = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );

  const [productPrice, setProductPrice] = useState(
    postProductInfo?.price ? postProductInfo?.price : null,
  );

  const [productPriceSale, setProductPriceSale] = useState(
    postProductInfo?.priceSale ? postProductInfo?.priceSale : null,
  );

  const [selectedAttributes, setSelectedAttributes] = useState(
    postProductInfo?.attributeOptions || {},
  );

  const loading = useSelector((state) =>
    getListAttributesLoadingSelector(state),
  );

  const listAttributesSelector = useSelector(
    (state) => getListAttributesSelector(state),
    shallowEqual,
  );

  const listAttributes = listAttributesSelector.content || [];

  const [selectedModalItem, setSelectedModalItem] = useState(false);

  const priceRef = useRef();
  const attrRef = useRef();

  const _handleSelectAttributes = (key, value) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [key]: value,
    });
  };
  // const _handleSelectedRadioAttributes = (key, value) => {
  //   let temp = {...selectedRadioAttributes};
  //   temp[key] = [value];
  //   setSelectedRadioAttributes({...temp});
  // };

  const _handleChangePrice = (value) => {
    let parseValue = `${value}`.split('.').join('');
    if (parseValue.length > 8) console.log('lớn hơn');
    if (`${parseValue * 1}` === 'NaN') {
      return;
    }
    setProductPrice(parseValue);
  };

  const _handleChangePriceSale = (value) => {
    let parseValue = `${value}`.split('.').join('');
    if (parseValue.length > 8) console.log('lớn hơn');
    if (`${parseValue * 1}` === 'NaN') {
      return;
    }
    setProductPriceSale(parseValue);
  };

  const onSubmitPress = () => {
    if (productPriceSale / productPrice < 0.1) {
      Alert.alert(i18n.t('addProduct.productPriceInvalid'));
      return;
    }
    const idx = Object.values(selectedAttributes).findIndex(
      (item) => item.length,
    );

    let matrixOptions = [];
    matrixOptions = Object.values(selectedAttributes).map((listOption) =>
      listOption.map((item) => ({
        attrValue: item?.attrValue,
        attributeId: item?.attributeId,
        id: null,
      })),
    );

    if (idx === -1) {
      showMessage({
        message: i18n.t('addProduct.chooseAtLeastOne'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    if (!productPrice) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
        position: 'top',
      });
      return;
    }

    if (!Number.isInteger(productPrice * 1)) {
      showMessage({
        message: i18n.t('addProduct.priceMustBeInteger'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    if (productPrice * 1 > 100000000) {
      showMessage({
        message: i18n.t('addProduct.limitPriceReached'),
        type: 'danger',
        position: 'top',
      });
      return;
    }

    navigation.navigate('PaymentShipping');
    dispatch(
      postProductActions.setProductInfo({
        attributeOptions: matrixOptions,
        price: productPrice,
        priceSale: productPriceSale,
      }),
    );
  };

  useEffect(() => {
    if (
      listAttributes &&
      listAttributes.length &&
      !Object.keys(selectedAttributes).length
    ) {
      let newAttributesObject = [...listAttributes].reduce((obj, item) => {
        if (item.type !== 3) {
          obj[item.key] = [];
          return obj;
        }
        return obj;
      }, {});

      setSelectedAttributes({...newAttributesObject});
    }
  }, [listAttributes]);

  useEffect(() => {
    priceRef.current = productPrice;
    attrRef.current = selectedAttributes;
  }, [productPrice, selectedAttributes]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      dispatch(
        postProductActions.setProductInfo({
          attributeOptions: attrRef.current,
          price: priceRef.current,
          priceSale: productPriceSale,
        }),
      );
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView>
          <Header
            isDefault
            title={i18n.t('addProduct.productInformationTitle')}
          />
          <ProgressBar progress={0.67} color="#823FFD" />
          <View
            style={[
              styles.container,
              {
                height: HEIGHT - HEIGHT_HEADER,
              },
            ]}>
            {listAttributes && listAttributes.length
              ? listAttributes.map((item) => (
                  <TouchableOpacity
                    key={item?.id}
                    onPress={() => {
                      setSelectedModalItem(item);
                    }}
                    style={styles.boxWrap}>
                    <View style={styles.status}>
                      <Text style={styles.title}>{item?.label}</Text>
                      <View style={styles.selectItemContainer}>
                        {selectedAttributes?.[item?.key]?.map((v, index) => (
                          <View
                            style={styles.viewStatus}
                            key={`${v?.name}-${index}`}>
                            <Text>{v.name}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              : null}

            <View style={styles.boxWrap}>
              <View style={styles.wrapTitle}>
                <Text style={styles.title}>
                  {i18n.t('addProduct.productPrice')}
                </Text>
                <IconFont name="asterisk" size={6} color="red" />
              </View>
              <View style={styles.inputPrice}>
                <TextInput
                  style={styles.input}
                  onChangeText={_handleChangePrice}
                  value={
                    productPrice
                      ? getNumberWidthDot(productPrice * 1 || 0)
                      : null
                  }
                  placeholder="0"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <View style={styles.verticalLine} />
                <Text style={styles.currencyUnitText}>đ</Text>
              </View>
            </View>

            <View style={styles.boxWrap}>
              <View style={styles.wrapTitle}>
                <Text style={styles.title}>
                  {i18n.t('addProduct.productSale')}
                </Text>
                <IconFont name="asterisk" size={6} color="red" />
              </View>
              <View style={styles.inputPrice}>
                <TextInput
                  style={styles.input}
                  onChangeText={_handleChangePriceSale}
                  value={
                    productPriceSale
                      ? getNumberWidthDot(productPriceSale * 1 || 0)
                      : null
                  }
                  placeholder="0"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <View style={styles.verticalLine} />
                <Text style={styles.currencyUnitText}>đ</Text>
              </View>
            </View>
          </View>

          <ModalSelectAttributes
            item={selectedModalItem || {}}
            key={selectedModalItem?.key}
            setSelectedModalItem={setSelectedModalItem}
            _handleSelectAttributes={_handleSelectAttributes}
            selectedAttributes={selectedAttributes}
            selectedModalItem={selectedModalItem || {}}
          />
        </ScrollView>
        <View style={styles.button}>
          <ButtonRounded
            onPress={onSubmitPress}
            label={i18n.t('addProduct.descriptionButton')}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemeView>
  );
};
export default ProductInfor;
