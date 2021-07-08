import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';

import {ActivityIndicator, ProgressBar} from 'react-native-paper';
import {Header, ButtonRounded, ThemeView} from 'components';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ListShippingMethod from './ListShipping';
import ListPayment from './ListPayment';
import {useNavigation} from '@react-navigation/native';
import i18n from 'i18n';
import {showMessage} from 'react-native-flash-message';
import {userTokenSelector} from 'redux/selectors/user';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {userActions} from 'reducers';
import {BUYER} from 'constants';
import {
  getPostProductInfoSelector,
  getPostProductLoadingSelector,
  getPostProductStatusSelector,
} from 'redux/selectors/postProduct';
import {Storage, Auth} from 'aws-amplify';
import {postProductActions} from 'redux/reducers';

const PaymentShipping = () => {
  const WIDTH = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const profile = useSelector((state) => userTokenSelector(state));
  const role = profile?.signInUserSession?.idToken?.payload?.['cognito:groups'];
  const sub = profile?.signInUserSession?.idToken?.payload?.sub;

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [selectedDeliveryType, setSelectedDeliveryType] = useState([]);

  const [uploadList, setUploadList] = useState([]);
  const [doneUpload, setDoneUpload] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const postProductLoading = useSelector((state) =>
    getPostProductLoadingSelector(state),
  );
  const postProductStatus = useSelector((state) =>
    getPostProductStatusSelector(state),
  );

  const customPrefix = `/public/${sub}/posts/`;

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );

  const {images} = postProductInfo;

  const onChangeLocationPress = () => {
    navigation.navigate('AddressTyping');
  };

  const _handleSubmit = () => {
    if (!selectedPaymentMethods.length || !selectedDeliveryType.length) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    const {images} = postProductInfo;

    if (uploadList && uploadList.length) {
      postProduct();
      return;
    }
    uploadImages(images);
  };

  const uploadImages = (images) => {
    setSubmitLoading(true);
    if (images.length) {
      images.forEach(async (item) => {
        await uploadToStorage(item, images);
      });
    }
  };
  const uploadToStorage = async (image, imageList) => {
    try {
      if (!image.uri) {
        return;
      }
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${sub}/posts/product_${time}.jpg`;
      try {
        const result = await Storage.put(fileName, blob, {
          contentType: 'image/jpeg',
        });
        if (result) {
          setUploadList((prev) => {
            let newList = prev;
            newList[image.index] = {
              name: `product_${time}.jpg`,
              index: image.index,
            };
            return newList;
          });
        }
      } catch (err) {
        Alert.alert(i18n.t('error.cannotUploadImage'));
        setSubmitLoading(false);
      }
    } catch (err) {
      Alert.alert(i18n.t('error.cannotGetImage'));
      setSubmitLoading(false);
    } finally {
      if (image.index === imageList.length - 1) {
        setDoneUpload(true);
      }
    }
  };
  const postProduct = () => {
    const {
      childrenCategory,
      attributeOptions,
      name,
      description,
      brand,
      price,
    } = postProductInfo;

    const imagesList = uploadList.map((item) => {
      return {
        name: item.name,
        path: customPrefix,
      };
    });
    dispatch(
      postProductActions.getPostProduct({
        brandId: brand?.id * 1,
        categoryId: childrenCategory?.id * 1,
        storeId: null,
        name: name,
        description: description,
        price: price * 1,
        productPriceRequest: [
          {
            name: null,
            productId: null,
            sku: null,
            price: price * 1,
            priceSale: 0,
            productAttributes: [...attributeOptions],
          },
        ],
        paymentTypes: [...selectedPaymentMethods?.map((v) => v.id)],
        shippingProviders: [...selectedDeliveryType?.map((v) => v.id)],
        productImageRequests: [...imagesList],
      }),
    );
  };

  useEffect(() => {
    if (
      doneUpload &&
      uploadList.length === images.length &&
      uploadList.every((image) => Boolean(image))
    ) {
      postProduct();
    }
  }, [doneUpload, JSON.stringify(uploadList)]);

  useEffect(() => {
    if (!postProductLoading) {
      setSubmitLoading(false);
    }
  }, [postProductLoading]);
  useEffect(() => {
    if (postProductStatus === 'failed') {
      showMessage({
        message: i18n.t('addProduct.postFailed'),
        type: 'danger',
        position: 'top',
      });
      dispatch(postProductActions.setProductInfo({postProductStatus: ''}));
      return;
    }
    if (postProductStatus === 'success') {
      navigation.navigate('Home');
      showMessage({
        titleStyle: {...styles.notiTitle},
        message: i18n.t('addProduct.postSuccess'),
        textStyle: {...styles.notiSubTitle},
        description: postProductInfo.name,
        type: 'success',
        position: {
          bottom: 90,
          left: 0,
        },
        icon: {icon: 'success', position: 'left'},
        style: {
          ...styles.notiContainer,
        },
        renderFlashMessageIcon: () => (
          <Image
            style={styles.notiImage}
            source={
              images && images.length
                ? {
                    uri: images[0].uri,
                  }
                : require('assets/images/default.png')
            }
          />
        ),
      });
      dispatch(postProductActions.clearPostInfo());
    }
  }, [postProductStatus]);

  return (
    <ThemeView
      style={{flex: 1}}
      pointerEvents={submitLoading ? 'none' : 'auto'}
      isFullView>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>Thông tin sản phẩm</Text>
        }
      />
      <ProgressBar progress={1} color="#823FFD" />
      <View style={styles.container}>
        {/* {role && role?.length === 1 && role[0] === BUYER ? null : (
          <View style={styles.boxWrap}>
            <View style={styles.status}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="ios-location-sharp" size={20} color="grey" />
                <Text style={styles.title}>
                  {i18n.t('addProduct.yourLocation')}
                </Text>
              </View>
              <TouchableOpacity onPress={onChangeLocationPress}>
                <Text style={styles.rightTitle}>
                  {i18n.t('addProduct.changeLocation')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.location}>
              <Text style={{fontSize: 15}}>
                56 Nguyễn Đình Chiểu Đa Kao, Quận 1, TP Hồ Chí Minh
              </Text>
            </View>
          </View>
        )} */}

        <View style={styles.boxWrap}>
          <ListPayment
            setSelectedPaymentMethods={setSelectedPaymentMethods}
            selectedPaymentMethods={selectedPaymentMethods}
          />
        </View>

        <View style={styles.boxWrap}>
          <ListShippingMethod
            setSelectedDeliveryType={setSelectedDeliveryType}
            selectedDeliveryType={selectedDeliveryType}
          />
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity onPress={_handleSubmit}>
          <ButtonRounded
            label={
              submitLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                i18n.t('addProduct.postProduct')
              )
            }
          />
        </TouchableOpacity>
      </View>
    </ThemeView>
  );
};
export default PaymentShipping;
