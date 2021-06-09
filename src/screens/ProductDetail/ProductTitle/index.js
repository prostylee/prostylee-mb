import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import {productSelectors} from 'reducers';
import {ProductBookmark} from 'components';

import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import {currencyFormat} from 'utils/currency';

const ProductTitle = (props) => {
  const {colors} = useTheme();
  const productId = props.productId ? props.productId : 0;
  const name = props.name ? props.name : '';
  const price = props.price ? props.price : 0;
  const priceOriginal = props.priceOriginal ? props.priceOriginal : 0;
  const rateValue = props.rateValue ? props.rateValue : 0;
  const numberOfRate = props.numberOfRate ? props.numberOfRate : 0;

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
          <ProductBookmark item={{id: productId}} />
        </TouchableOpacity>
      </View>
      <Text style={styles.price}>{currencyFormat(price, 'đ')}</Text>
      <View style={styles.titleRow}>
        <Text style={styles.priceOriginal}>
          {currencyFormat(priceOriginal, 'đ')}
        </Text>
        <TouchableOpacity
          style={styles.rating}
          onPress={() => {
            props.navigation.navigate('ReviewRating', {
              productId: props.productId,
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

export default ProductTitle;
