import styles from './styles';

import React from 'react';
import {AirbnbRating} from 'react-native-ratings';

const RnRatingTap = ({
  onChangeValue,
  value,
  isDisabled,
  count,
  ratingColor,
  ...rest
}) => {
  return (
    <AirbnbRating
      defaultRating={value}
      selectedColor={ratingColor}
      count={count}
      showRating={false}
      startingValue={value}
      onFinishRating={onChangeValue}
      starContainerStyle={styles.container}
      isDisabled={isDisabled}
      {...rest}
    />
  );
};

RnRatingTap.defaultProp = {
  value: 0,
  count: 5,
  ratingColor: '#F48231',
  isDisabled: false,
  ratingBackgroundColor: 'transparent',
};

export default RnRatingTap;
