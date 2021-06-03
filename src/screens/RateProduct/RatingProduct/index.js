/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';

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

const RatingProduct = ({navigation, product, productId}) => {
  const [star, setStar] = useState();
  const [imageList, setImageList] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {}, [productId]);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.signInUserSession.idToken.payload.sub);
      })
      .catch((err) => console.log(err));
  }, []);

  //handle User signIn
  const onRate = async () => {
    await mapData();
    await onSubmit();
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
        if (res.status !== 200) {
          console.log('failed');
          showMessage({
            message: I18n.t("rateProduct.ratingFailTitle"),
            description: I18n.t("rateProduct.ratingFailContent"),
            type: 'danger',
          });
          return;
        }
        showMessage({
          message: I18n.t("rateProduct.ratingSuccessTitle"),
          description: I18n.t("rateProduct.ratingSuccessContent"),
          type: 'success',
        });
        navigation.navigate('Products', {});
      })
      .catch((e) => console.log('Error: ', e));
  };

  const onPickRating = (rate) => {
    setStar(rate);
  };

  const mapData = async () => {
    await Promise.all(
      await imageList.map(async (item) => {
        await uploadToStorage(item.source);
        return item + 1;
      }),
    );
  };

  const uploadToStorage = async (uri) => {
    try {
      if (!uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${userId}/reviewrating/review_${time}.jpg`;
      Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      })
        .then(async (result) => {
          const name = `review_${time}.jpg`;
          await getUrl(result?.key, name);
        })
        .catch((err) => console.log(err));

      dispatch(commonActions.toggleLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = async (key, name) => {
    const signedURL = await Storage.get(key);
    const newImg = {
      name: name,
      path: signedURL,
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
