import styles from './styles';
import React from 'react';

import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {View} from 'react-native';

const Rating = ({rate, size, style}) => {
  const {colors} = useTheme();

  const Rating = ({value}) => {
    return [0, 1, 2, 3, 4].map((item) => {
      if (value - item >= 1) {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star'}
            size={size}
            color={colors['$rateStar']}
          />
        );
      } else if (value - item > 0) {
        return (
          <IonIcons
            key={`star_${item}`}
            name={'star-half-sharp'}
            size={size}
            color={colors['$rateStar']}
          />
        );
      } else {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star-outlined'}
            size={size}
            color={colors['$rateStar']}
          />
        );
      }
    });
  };

  return (
    <View style={{...styles.container, ...style}}>
      <Rating value={rate} />
    </View>
  );
};

Rating.defaultProps = {
  size: 12,
};

export default Rating;
