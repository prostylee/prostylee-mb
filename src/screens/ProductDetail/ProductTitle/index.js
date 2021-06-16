import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

/*Hooks*/
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

/*Reducers*/
import {productSelectors} from 'reducers';

/*Components*/
import {ProductBookmark} from 'components';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';

/*Utils*/
import {currencyFormat} from 'utils/currency';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductTitle = ({
  productId,
  name,
  price,
  priceOriginal,
  numberOfRate,
  navigation,
  bookmarkStatus,
}) => {
  const {colors} = useTheme();

  const totalRate = useSelector((state) =>
    productSelectors.getProductCommentsAverage(state),
  );

  const totalRateDisplay =
    typeof totalRate === 'number' ? totalRate?.toFixed(1) : 0;

  const Rating = ({rate}) => {
    return [0, 1, 2, 3, 4].map((item) => {
      if (rate - item >= 1) {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      } else if (rate - item > 0) {
        return (
          <IonIcons
            key={`star_${item}`}
            name={'star-half-sharp'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      } else {
        return (
          <Entypo
            key={`star_${item}`}
            name={'star-outlined'}
            size={12}
            color={colors['$rateStar']}
          />
        );
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.bookmark} onPress={() => {}}>
          <ProductBookmark
            item={{id: productId, bookmarkStatus: bookmarkStatus}}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>
        {price
          ? currencyFormat(price, 'đ')
          : currencyFormat(priceOriginal, 'đ')}
      </Text>
      <View style={styles.titleRow}>
        <Text style={styles.priceOriginal}>
          {price ? currencyFormat(priceOriginal, 'đ') : ''}
        </Text>
        <TouchableOpacity
          style={styles.rating}
          onPress={() => {
            navigation.navigate('ReviewRating', {
              productId: productId,
            });
          }}>
          <Rating rate={totalRate} />
          <Text
            style={
              styles.rateNumber
            }>{`${totalRateDisplay} (${numberOfRate})`}</Text>
          <IonIcons
            name={'ios-chevron-forward'}
            size={14}
            color={colors['$lightGray']}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

ProductTitle.defaultProps = {
  productId: null,
  name: null,
  price: 0,
  priceOriginal: 0,
  numberOfRate: 0,
};

ProductTitle.PropTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  priceOriginal: PropTypes.number,
  numberOfRate: PropTypes.number,
};

export default ProductTitle;
