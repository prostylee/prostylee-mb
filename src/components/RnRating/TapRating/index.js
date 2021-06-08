import styles from './styles';

import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {Text, View} from 'react-native';
import Star from '../components/Star';

const TapRating = (props) => {
  const [position, setPosition] = useState(props.defaultRating);

  useEffect(() => {
    const {defaultRating} = props;
    if (!defaultRating) {
      setPosition(1);
    } else {
      setPosition(defaultRating);
    }
  }, [props.defaultRating]);

  const renderStars = (rating_array) => {
    return _.map(rating_array, (star) => {
      return star;
    });
  };

  const starSelectedInPosition = (position) => {
    const {onFinishRating} = props;
    if (typeof onFinishRating === 'function') {
      onFinishRating(position);
    }
    setPosition(position);
  };

  const {count, reviews, showRating, reviewColor, reviewSize} = props;
  const rating_array = [];
  const starContainerStyle = [styles.starContainer];
  if (props.starContainerStyle) {
    starContainerStyle.push(props.starContainerStyle);
  }
  _.times(count, (index) => {
    rating_array.push(
      <Star
        key={index}
        position={index + 1}
        starSelectedInPosition={(value) => {
          starSelectedInPosition(value);
        }}
        fill={position >= index + 1}
        {...props}
      />,
    );
  });
  return (
    <View style={styles.ratingContainer}>
      <View style={starContainerStyle}>{renderStars(rating_array)}</View>
      {showRating && (
        <Text
          style={[
            styles.reviewText,
            {fontSize: reviewSize, color: reviewColor},
          ]}>
          {reviews[position - 1]}
        </Text>
      )}
    </View>
  );
};

TapRating.defaultProps = {
  defaultRating: -1,
  reviews: ['Terrible', 'Bad', 'Okay', 'Good', 'Great'],
  count: 5,
  showRating: true,
  reviewColor: '#F48231',
  reviewSize: 25,
};

export default TapRating;
