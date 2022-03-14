/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState} from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {View, Text, ScrollView, Alert} from 'react-native';
import {
  ThemeView,
  AirbnbRating,
  ButtonRounded,
  TextInputArea,
} from 'components';
import Item from './Item';
import ChooseImage from '../ChooseImage';
import {commonActions} from 'reducers';
import {useDispatch} from 'react-redux';
import {Storage, Auth} from 'aws-amplify';
import {addReview} from 'services/api/reviewRatingApi';
import {reviewRatingActions} from 'reducers';

import {showMessage} from 'react-native-flash-message';
import * as ImageManipulator from '@pontusab/react-native-image-manipulator';

import {POST_SUCCESS} from 'constants';
import {useRoute} from '@react-navigation/native';

const RatingProduct = ({navigation, product, productId}) => {
  const route = useRoute();

  const [star, setStar] = useState(5);
  const [imageList, setImageList] = useState([]);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const onRateSuccess = route?.params?.onRateSuccess || (() => {});

  const customPrefix = `/public/${userId}/reviewrating/`;

  const dispatch = useDispatch();

  useEffect(() => {}, [productId]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.signInUserSession.idToken.payload.sub);
      })
      .catch(() => {
        showMessage({
          message: I18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
  }, []);

  //handle User signIn
  const onRate = async () => {
    await onSubmit();
  };

  const onSubmit = async () => {
    const upLoadedImages = await uploadImages(imageList);
    const imagesList = upLoadedImages.map((item) => {
      return {
        name: item.name,
        path: customPrefix,
      };
    });
    const body = {
      targetId: productId,
      targetType: 'PRODUCT',
      value: star,
      content: content,
      images: imagesList,
    };
    addReview(body)
      .then((res) => {
        if (res.data.status !== POST_SUCCESS) {
          showMessage({
            message: I18n.t('rateProduct.ratingFailTitle'),
            description: I18n.t('rateProduct.ratingFailContent'),
            type: 'danger',
            titleStyle: {fontSize: 13, fontWeight: '500'},
            textStyle: {fontSize: 13, fontWeight: '300'},
            icon: {icon: 'danger', position: 'left'},
            style: {
              alignItems: 'center',
            },
          });
          return;
        }
        showMessage({
          message: I18n.t('rateProduct.ratingSuccessTitle'),
          description: I18n.t('rateProduct.ratingSuccessContent'),
          type: 'success',
          position: {
            top: 40,
            left: 0,
          },
          titleStyle: {fontSize: 13, fontWeight: '500'},
          textStyle: {fontSize: 13, fontWeight: '300'},
          icon: {icon: 'success', position: 'left'},
        });
        dispatch(reviewRatingActions.setRatedListItem(productId));
        onRateSuccess(productId);
        navigation.goBack();
        setImageList([]);
      })
      .catch((e) => {
        showMessage({
          message: I18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      })
      .finally(() => {
        dispatch(commonActions.toggleLoading(false));
      });
  };

  const onPickRating = (rate) => {
    setStar(rate);
  };

  const uploadImages = async () => {
    let promises = [];
    if (imageList.length) {
      try {
        imageList.forEach(async (item) => {
          promises.push(uploadToStorage(item.source));
        });
        let res = await Promise.all(promises);
        return res;
      } catch (err) {
        throw Error('Can not upload image');
      }
    }
  };

  const uploadToStorage = async (uri) => {
    try {
      if (!uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      const pngImageResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG,
      });
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(pngImageResult.uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${userId}/reviewrating/review_${time}.png`;
      try {
        const result = await Storage.put(fileName, blob, {
          contentType: 'image/png',
        });
        if (result) {
          return {
            name: `review_${time}.png`,
          };
        }
      } catch (err) {
        Alert.alert(I18n.t('error.cannotUploadImage'));
        throw Error('Can not upload image');
      }
    } catch (err) {
      showMessage({
        message: I18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <View style={styles.formRate}>
        <ScrollView>
          <Item item={product} />
          <View style={styles.wrapItemRating}>
            <Text style={styles.ratingTitle}>
              {I18n.t('rateProduct.ratingTitle')}
            </Text>
            <AirbnbRating
              onFinishRating={onPickRating}
              showRating={true}
              defaultRating={star}
              reviews={[
                I18n.t('rateProduct.terrible'),
                I18n.t('rateProduct.bad'),
                I18n.t('rateProduct.notBad'),
                I18n.t('rateProduct.good'),
                I18n.t('rateProduct.perfect'),
              ]}
              reviewColor="#333333"
              reviewSize={14}
            />
          </View>
          <View style={styles.wrapItemReview}>
            <TextInputArea
              value={content}
              multiline={true}
              label={I18n.t('rateProduct.ratingTitle')}
              numberOfLines={5}
              maxLength={255}
              onChangeText={onChangeContent}
            />
          </View>
          <View style={styles.wrapItemReview}>
            <ChooseImage
              label={I18n.t('rateProduct.ratingimages')}
              images={imageList}
              setImages={setImageList}
              length={4}
            />
          </View>
        </ScrollView>

        <View style={styles.btnWrapper}>
          <ButtonRounded
            onPress={onRate}
            label={I18n.t('rateProduct.ratingSend')}
            disabled={!star}
          />
        </View>
      </View>
    </ThemeView>
  );
};

RatingProduct.defaultProps = {
  product: {},
  productId: 231,
};

RatingProduct.propTypes = {};

export default RatingProduct;
