import styles from './styles';

import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {CURRENCY_VIET_NAM} from 'constants';

/*Hooks*/
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';

/*Reducers*/
import {productSelectors} from 'reducers';

/*Components*/
import {ProductBookmark} from 'components';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import i18n from 'i18n';

/*Utils*/
import {currencyFormat} from 'utils/currency';

/*Proptypes*/
import PropTypes from 'prop-types';

const ProductTitle = ({
  productId,
  name,
  numberOfRate,
  navigation,
  bookmarkStatus,
  priceList,
  choiceSelect,
}) => {
  const {colors} = useTheme();
  const [productPrice, setProductPrice] = React.useState({});

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

  const getProductChoicePrice = () => {
    const choiceList = choiceSelect.map((item) => item.value.attrValue).sort();
    let attributeID = '';
    choiceList.forEach((element) => {
      attributeID = attributeID + '_' + element;
    });
    if (priceList[attributeID]) {
      setProductPrice(priceList[attributeID]);
    } else {
      setProductPrice(null);
    }
  };

  React.useEffect(() => {
    getProductChoicePrice();
  }, [choiceSelect]);

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
      {productPrice ? (
        <Text style={styles.price}>
          {productPrice.priceSale
            ? currencyFormat(productPrice.priceSale, CURRENCY_VIET_NAM)
            : currencyFormat(productPrice.price, CURRENCY_VIET_NAM)}
        </Text>
      ) : (
        <Text style={styles.notExist}>{i18n.t('productDetail.notExist')}</Text>
      )}
      <View style={styles.titleRow}>
        <Text style={styles.priceOriginal}>
          {productPrice && productPrice.priceSale
            ? currencyFormat(productPrice.price, CURRENCY_VIET_NAM)
            : ''}
        </Text>
        <TouchableOpacity
          style={styles.rating}
          onPress={() => {
            navigation.navigate('ReviewRating', {
              productId: productId,
            });
          }}>
          <Rating rate={totalRate} />
          <Text style={styles.rateNumber}>{`${totalRateDisplay} (${
            numberOfRate || 0
          })`}</Text>
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

ProductTitle.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string,
  price: PropTypes.number,
  priceOriginal: PropTypes.number,
  numberOfRate: PropTypes.number,
};

export default ProductTitle;
