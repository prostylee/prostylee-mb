import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors';

const Rating = ({value, color = '#F48231'}) => {
  return [0, 1, 2, 3, 4].map((item) => {
    if (value - item >= 1) {
      return (
        <Entypo key={`star_${item}`} name={'star'} size={12} color={color} />
      );
    } else if (value - item > 0) {
      return (
        <IonIcons
          key={`star_${item}`}
          name={'star-half-sharp'}
          size={12}
          color={color}
        />
      );
    } else {
      return (
        <Entypo
          key={`star_${item}`}
          name={'star-outlined'}
          size={12}
          color={color}
        />
      );
    }
  });
};
export default Rating;
