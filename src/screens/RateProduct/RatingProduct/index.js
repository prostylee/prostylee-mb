/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState} from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {View, Text, ScrollView} from 'react-native';
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

import {showMessage} from 'react-native-flash-message';
import * as ImageManipulator from '@pontusab/react-native-image-manipulator';

import {POST_SUCCESS} from 'constants';
import {useRoute} from '@react-navigation/native';

const RatingProduct = ({navigation, product, productId}) => {
  const route = useRoute();

  const [star, setStar] = useState(5);
  const [imageList, setImageList] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);
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

  useEffect(() => {
    if (uploadComplete && imageList.length === imgs.length) {
      onSubmit();
    }
  }, [uploadComplete, imgs, imageList, star, content]);

  //handle User signIn
  const onRate = async () => {
    await mapData();
  };

  const onSubmit = async () => {
    const body = {
      targetId: productId,
      targetType: 'PRODUCT',
      value: star,
      content: content,
      images: imgs,
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
        onRateSuccess(productId);
        navigation.goBack();
        setImgs([]);
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
        setUploadComplete(false);
      });
  };

  const onPickRating = (rate) => {
    setStar(rate);
  };

  const mapData = async () => {
    try {
      await Promise.all(
        imageList.map(async (item) => {
          await uploadToStorage(item.source);
          return item + 1;
        }),
      );
    } finally {
      setUploadComplete(true);
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
      Storage.put(fileName, blob, {
        contentType: 'image/png',
      })
        .then(async (result) => {
          const name = `review_${time}.png`;
          await getUrl(result?.key, name);
        })
        .catch((_) => {
          showMessage({
            message: I18n.t('unknownMessage'),
            type: 'danger',
            position: 'top',
          });
        });
    } catch (err) {
      showMessage({
        message: I18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  };
  const getUrl = async (key, name) => {
    const newImg = {
      name: name,
      path: customPrefix,
    };
    setImgs([...imgs, newImg]);
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
