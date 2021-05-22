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

const RatingProduct = ({navigation, product}) => {
  const [star, setStar] = useState();
  const [imageList, setImageList] = useState([]);

  //handle User signIn
  const onRate = () => {};

  const onPickRating = (rate) => {
    setStar(rate);
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
};

RatingProduct.propTypes = {};

export default RatingProduct;
