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
import {Header, ButtonRounded, ThemeView, SlideInModal} from 'components';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import ListShippingMethod from './ListShipping';
import ListPayment from './ListPayment';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {
  commonActions,
  dynamicUsersActions,
  newFeedActions,
  storeActions,
} from 'redux/reducers';
import {Storage, Auth} from 'aws-amplify';
import {postProductActions} from 'redux/reducers';

import {postProduct as postProductApi} from 'services/api/postProductApi';
import {
  POST_SUCCESS,
  LIMIT_DEFAULT,
  NUMBER_OF_PRODUCT,
  PAGE_DEFAULT,
  TYPE_STORE,
  TYPE_USER,
} from 'constants';

import Loading from './LoadingIndicatorView';

import {targetTypeSelector} from 'redux/selectors/common';

const PaymentShipping = () => {
  const paymentRef = React.useRef();
  const deliveryRef = React.useRef();

  const WIDTH = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const postProductInfo = useSelector(
    (state) => getPostProductInfoSelector(state),
    shallowEqual,
  );

  const profile = useSelector((state) => userTokenSelector(state));
  const role = profile?.signInUserSession?.idToken?.payload?.['cognito:groups'];
  const sub = profile?.signInUserSession?.idToken?.payload?.sub;

  const [postProductLoading, setPostProductLoading] = useState(false);

  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState(
    postProductInfo?.paymentMethod || [],
  );
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(
    postProductInfo?.deliveryType || [],
  );

  const targetType = useSelector((state) => targetTypeSelector(state));

  const customPrefix = `/public/${sub}/posts/`;

  const {images} = postProductInfo;

  const uploadImages = async (images) => {
    let promises = [];
    if (images.length) {
      try {
        images.forEach(async (item) => {
          promises.push(uploadToStorage(item, images));
        });
        let res = await Promise.all(promises);
        return res;
      } catch (err) {
        throw Error('Can not upload image');
      }
    }
  };
  const uploadToStorage = async (image) => {
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
          return {
            name: `product_${time}.jpg`,
            index: image.index,
          };
        }
      } catch (err) {
        Alert.alert(i18n.t('error.cannotUploadImage'));
        throw Error('Can not upload image');
      }
    } catch (err) {
      Alert.alert(i18n.t('error.cannotGetImage'));
      throw Error('Can not upload image');
    } finally {
    }
  };
  const postProduct = async () => {
    if (!selectedPaymentMethods.length || !selectedDeliveryType.length) {
      showMessage({
        message: i18n.t('addProduct.pleaseFillInformation'),
        type: 'danger',
        position: 'top',
      });
      return;
    }
    try {
      SlideInModal.show(() => {}, <Loading />, 'fadeIn', 'fadeOut');
      setPostProductLoading(true);
      const upLoadedImages = await uploadImages(images);

      const {
        childrenCategory,
        attributeOptions,
        name,
        description,
        brand,
        price,
      } = postProductInfo;

      const imagesList = upLoadedImages.map((item) => {
        return {
          name: item.name,
          path: customPrefix,
        };
      });
      const groupedAttributes = formatPriceAttribute(attributeOptions);

      const newProductPriceRequest = groupedAttributes.map((item) => {
        return {
          name: null,
          productId: null,
          sku: null,
          price: price * 1,
          priceSale: 0,
          productAttributes: [...item],
        };
      });
      const res = await postProductApi({
        brandId: brand?.id * 1,
        categoryId: childrenCategory?.id * 1,
        storeId: null,
        name: name,
        description: description,
        price: price * 1,
        productPriceRequest: [...newProductPriceRequest],
        paymentTypes: [...selectedPaymentMethods?.map((v) => v.id)],
        shippingProviders: [...selectedDeliveryType?.map((v) => v.id)],
        productImageRequests: [...imagesList],
      });
      if (res.data.status === POST_SUCCESS) {
        reloadNewFeed();
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
        dispatch(postProductActions.clearPostProduct());
        navigation.navigate('Home');
      } else {
        showMessage({
          message: i18n.t('addProduct.postFailed'),
          type: 'danger',
          position: 'top',
        });
      }
    } catch (err) {
      showMessage({
        message: i18n.t('addProduct.postFailed'),
        type: 'danger',
        position: 'top',
      });
    } finally {
      setPostProductLoading(false);
      SlideInModal.hide();
    }
  };

  const formatPriceAttribute = (originArray = []) => {
    let array = [...originArray].filter((item) => item && item?.length);
    let result = array[0].map((item) => [item]);
    for (let i = 1; i < array.length; i++) {
      let resultNew = [];
      for (let k = 0; k < result.length; k++) {
        for (let j = 0; j < array[i].length; j++) {
          resultNew.push([...result?.[k], array[i][j]]);
        }
      }
      result = resultNew;
    }
    return result;
  };

  const reloadNewFeed = () => {
    dispatch(newFeedActions.resetPage());
    dispatch(
      newFeedActions.getNewFeed({
        page: PAGE_DEFAULT,
        limit: LIMIT_DEFAULT,
        newFeedType: targetType,
      }),
    );
    if (targetType === TYPE_STORE) {
      dispatch(
        storeActions.getTopProduct({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT - 2,
          numberOfProducts: NUMBER_OF_PRODUCT,
        }),
      );
      dispatch(
        newFeedActions.getStoriesByStore({
          page: PAGE_DEFAULT,
        }),
      );
    } else if (targetType === TYPE_USER) {
      dispatch(
        dynamicUsersActions.getDynamicUser({
          page: PAGE_DEFAULT,
          limit: LIMIT_DEFAULT - 2,
        }),
      );
      dispatch(
        newFeedActions.getStoriesByUser({
          page: PAGE_DEFAULT,
        }),
      );
    }
  };
  useEffect(() => {
    paymentRef.current = selectedPaymentMethods;
    deliveryRef.current = selectedDeliveryType;
  }, [selectedDeliveryType, selectedPaymentMethods]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      dispatch(
        postProductActions.setProductInfo({
          paymentMethod: paymentRef.current,
          deliveryType: deliveryRef.current,
        }),
      );
    });
    return unsubscribe;
  }, []);
  return (
    <ThemeView style={{flex: 1}} isFullView>
      <Header
        isDefault
        containerStyle={styles.headerContain}
        leftStyle={{
          height: 30,
          fontWeight: 'bold',
        }}
        middleComponent={
          <Text style={styles.middleComponent}>
            {i18n.t('addProduct.productInformationTitle')}
          </Text>
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
        <TouchableOpacity onPress={postProduct}>
          <ButtonRounded
            label={
              postProductLoading ? (
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
