import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import i18n from 'i18n';
import {ProgressBar} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';

import styles from './styles';

import {postProductActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import ModalSelectAttributes from './ModalSelectAttributes';

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

  const [productPrice, setProductPrice] = useState(null);
  // const [selectedRadioAttributes, setSelectedRadioAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const loading = useSelector((state) =>
    getListAttributesLoadingSelector(state),
  );

  const listAttributesSelector = useSelector(
    (state) => getListAttributesSelector(state),
    shallowEqual,
  );

  const listAttributes = listAttributesSelector.content || [];

  const [selectedModalItem, setSelectedModalItem] = useState(false);

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
    if (`${value * 1}` === 'NaN') {
      return;
    }
    setProductPrice(value);
  };

  const onSubmitPress = () => {
    const idx = Object.values(selectedAttributes).findIndex(
      (item) => !item.length,
    );

    let matrixOptions = [];
    matrixOptions = Object.values(selectedAttributes).map((listOption) =>
      listOption.map((item) => ({
        attrValue: item?.attrValue,
        attributeId: item?.attributeId,
        id: null,
      })),
    );

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
      // let radioAttributes = [...listAttributes].reduce((obj, item) => {
      //   if (item.type === 3) {
      //     obj[item.key] = [];
      //     return obj;
      //   }
      //   return obj;
      // }, {});
      setSelectedAttributes({...newAttributesObject});
      // setSelectedRadioAttributes({...radioAttributes});
    }
  }, [listAttributes]);

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
              <Text style={styles.title}>
                {i18n.t('addProduct.productPrice')}
              </Text>
              <View style={styles.inputPrice}>
                <TextInput
                  style={styles.input}
                  onChangeText={_handleChangePrice}
                  value={productPrice}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <Text style={styles.verticalLine}>|</Text>
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
          <View style={styles.button}>
            <ButtonRounded
              onPress={onSubmitPress}
              label={i18n.t('addProduct.descriptionButton')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemeView>
  );
};
export default ProductInfor;
