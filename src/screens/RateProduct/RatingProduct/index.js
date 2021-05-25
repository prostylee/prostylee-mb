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
import {Formik} from 'formik';
import ChooseImage from '../ChooseImage';


const RatingProduct = ({navigation, product, productId}) => {
  const [star, setStar] = useState();
  const [imageList, setImageList] = useState([]);

  useEffect(()=>{},[productId])

  //handle User signIn
  const onRate = () => {};

  const onPickRating = (rate) => {
    setStar(rate);
  };

  const onGetImage = (imgs) => {
    console.log('get images', imgs);
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
        .then((result) => {
          onSuccess({name: `review_${time}.jpg`});
          getUrl(result.key);
        })
        .catch((err) => console.log(err));

      dispatch(commonActions.toggleLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = async (key) => {
    const signedURL = await Storage.get(key);
    // setUploadedPhoto(signedURL);
    // console.log('signedURL ' + signedURL);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Formik validateOnMount={true} onSubmit={onRate}>
        {({handleSubmit, values, isValid}) => (
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
                  multiline={true}
                  label={I18n.t('rateProduct.ratingTitle')}
                  numberOfLines={5}
                  maxLength={255}
                />
              </View>
              <View style={styles.wrapItemReview}>
                <ChooseImage
                  label={I18n.t('rateProduct.ratingimages')}
                  images={imageList}
                  setImages={setImageList}
                  onSuccess={onGetImage}
                />
              </View>
            </ScrollView>

            <View style={styles.btnWrapper}>
              <ButtonRounded
                onPress={handleSubmit}
                label={I18n.t('rateProduct.ratingSend')}
                disabled={!star}
              />
            </View>
          </View>
        )}
      </Formik>
    </ThemeView>
  );
};

RatingProduct.defaultProps = {
  product: {},
  productId: 134,
};

RatingProduct.propTypes = {};

export default RatingProduct;
