/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';

import React, {useEffect, useState, useRef} from 'react';
/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {
  Animated,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import {
  Header,
  ThemeView,
  AirbnbRating,
  ButtonRounded,
  CustomSecureInput,
  CustomTextInput,
  TextButton,
  TextInputArea,
} from 'components';
import Item from './Item';
import {Formik, Field} from 'formik';
import ChooseImage from '../ChooseImage';

const RatingProduct = ({navigation, product}) => {
  return (
    <Animated.View>
      <Item item={product} />
      <View style={styles.wrapItemRating}>
        <Text style={styles.ratingTitle}>
          {I18n.t('rateProduct.ratingTitle')}
        </Text>
        <AirbnbRating
          showRating={true}
          defaultRating={0}
          reviews={['Te', 'Tam on', 'Tot', 'Rat tot']}
          reviewColor="#333333"
          reviewSize={14}
        />
      </View>
      <View style={styles.wrapItemReview}>
        <TextInputArea
          multiline={true}
          label="Nhan xet cua ban"
          numberOfLines={5}
        />
      </View>
      <View style={styles.wrapItemReview}>
        <ChooseImage label="Them hinh anh san pham" />
      </View>
    </Animated.View>
  );
};

RatingProduct.defaultProps = {
  product: {},
};

RatingProduct.propTypes = {};

export default RatingProduct;
