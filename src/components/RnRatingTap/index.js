import React from 'react';
import StarRating from 'react-native-star-rating';

import styles from './styles';

const IC_STAR = require('../../assets/icons/star.png');
const IC_STAR_EMPTY = require('../../assets/icons/star_empty.png');
import {rem} from '../../utils';

const RnRatingTap = ({
  onChangeValue,
  value,
  disabled,
  buttonStyle,
  containerStyle,
  starStyle,
}) => (
  <StarRating
    containerStyle={[styles.container, containerStyle]}
    buttonStyle={[styles.buttonStyle, buttonStyle]}
    starStyle={starStyle}
    disabled={disabled ? disabled : false}
    emptyStar={IC_STAR_EMPTY}
    fullStar={IC_STAR}
    emptyStarColor={'#ddd'}
    fullStarColor={'#242424'}
    maxStars={5}
    rating={value}
    starSize={18 * rem}
    selectedStar={(rating) => onChangeValue(rating)}
  />
);

export default RnRatingTap;
