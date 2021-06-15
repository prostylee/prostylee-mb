import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import i18n from 'i18n';
import {ProgressBar, Button} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';
import RadioForm from 'react-native-simple-radio-button';
import Modal from 'react-native-modal';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBoxAttributes from './CheckBoxAttributes';
import ButtonAttributes from './ButtonAttributes';

import {postProductActions} from 'redux/reducers';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {
  getListAttributesSelector,
  getListAttributesLoadingSelector,
  getPostProductInfoSelector,
} from 'redux/selectors/postProduct';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProductInfor = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );

  const [productPrice, setProductPrice] = useState(null);
  const [selectedRadioAttributes, setSelectedRadioAttributes] = useState([]);
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
  const _handleSelectedRadioAttributes = (key, value) => {
    let temp = {...selectedRadioAttributes};
    temp[key] = [value];
    setSelectedRadioAttributes({...temp});
  };

  const DynamicModal = ({item = {}}) => {
    return (
      <Modal
        transparent={true}
        animationOut="slideOutDown"
        isVisible={Object.keys(selectedModalItem).length}
        backdropOpacity={0.3}
        style={{justifyContent: 'flex-end', margin: 0}}
        testID={'modal'}
        deviceHeight={HEIGHT}
        deviceWidth={WIDTH}
        onBackdropPress={() => setSelectedModalItem({})}
        animationOutTiming={400}>
        <View style={styles.contentColors}>
          <View style={styles.headerModal}>
            <Text></Text>
            <Text style={styles.titleModal}>{item.label}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedModalItem({})}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <View>
            <ButtonAttributes
              data={item}
              setModalVisible={() => setSelectedModalItem({})}
              defaultState={selectedAttributes?.[item.key]}
              submitSelect={_handleSelectAttributes}
              allowSelectMultiple={false}
            />

            {/* <CheckBoxAttributes
              data={item}
              setModalVisible={() => setSelectedModalItem({})}
              defaultState={selectedAttributes?.[item.key]}
              submitSelect={_handleSelectAttributes}
              allowSelectMultiple={item?.allowsMultipleSelection}
            /> */}
          </View>
        </View>
      </Modal>
    );
  };

  const onSubmitPress = () => {
    const idx = Object.values(selectedAttributes).findIndex(
      (item) => !item.length,
    );
    if (!productPrice) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
      });
      return;
    }
    const arrayAttributesClone = []
      .concat(...Object.values(selectedAttributes))
      .concat(...Object.values(selectedRadioAttributes))
      .map((v) => ({
        id: null,
        attrValue: v.attrValue,
        attributeId: v.attributeId,
      }));
    console.log('SUBMIT ATTRI', arrayAttributesClone);
    navigation.navigate('PaymentShipping');
    dispatch(
      postProductActions.setProductInfo({
        attributeOptions: arrayAttributesClone,
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
      let radioAttributes = [...listAttributes].reduce((obj, item) => {
        if (item.type === 3) {
          obj[item.key] = [];
          return obj;
        }
        return obj;
      }, {});
      setSelectedAttributes({...newAttributesObject});
      setSelectedRadioAttributes({...radioAttributes});
    }
  }, [listAttributes]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('addProduct.productInformationTitle')} />
      <ProgressBar progress={0.67} color="#823FFD" />
      <View style={styles.container}>
        {/* {listAttributes && listAttributes.length
          ? listAttributes.map((item) =>
              item?.type === 3 ? (
                <View style={styles.boxWrap}>
                  <Text style={styles.title}>{item?.label}</Text>
                  <View style={{paddingTop: 10}}>
                    <RadioForm
                      radio_props={[
                        ...item?.attributeOptions.map((v) => ({
                          label: v.value,
                          value: {attributeId: v.id, attrValue: v.value},
                        })),
                      ]}
                      onPress={(value) => {
                        _handleSelectedRadioAttributes(item?.key, value);
                      }}
                      buttonColor={'#BBC0C3'}
                      buttonSize={8}
                      buttonOuterSize={18}
                    />
                  </View>
                </View>
              ) : null,
            )
          : null} */}

        {listAttributes && listAttributes.length
          ? listAttributes.map((item) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedModalItem(item);
                }}
                style={styles.boxWrap}>
                <View style={styles.status}>
                  <Text style={styles.title}>{item?.label}</Text>
                  <View style={styles.selectItemContainer}>
                    {selectedAttributes?.[item?.key]?.map((v) => (
                      <View style={styles.viewStatus}>
                        <Text>{v.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}

        <View style={styles.boxWrap}>
          <Text style={styles.title}>Giá sản phẩm</Text>
          <View style={styles.inputPrice}>
            <TextInput
              style={styles.input}
              onChangeText={setProductPrice}
              value={productPrice}
              placeholder="0"
              keyboardType="numeric"
            />
            <Text style={styles.verticalLine}>|</Text>
            <Text style={styles.currencyUnitText}>đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={onSubmitPress}>
          <ButtonRounded label="Tiếp tục" />
        </TouchableOpacity>
      </View>
      <DynamicModal item={selectedModalItem} key={selectedModalItem?.key} />
    </ThemeView>
  );
};
export default ProductInfor;
