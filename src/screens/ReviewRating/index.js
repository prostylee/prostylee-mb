import styles from './styles';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {View, Text} from 'react-native';
import ListReview from './ListReview';
import {Header, ThemeView, AirbnbRating} from 'components';

/*Api*/
import {getAverage, getListReview} from 'services/api/reviewRatingApi';

/*Selector*/
import {getListReviewRatingSelector} from 'redux/selectors/reviewRating';

const ReviewRating = ({navigation, data, productId}) => {
  const [rate, setRate] = useState(0);

  const listReviewRatingSelector = useSelector((state) =>
    getListReviewRatingSelector(state),
  );

  const listReviewRating = listReviewRatingSelector?.content || [];

  useEffect(() => {
    getAverage(productId)
      .then((res) => setRate(res.data.data))
      .catch(() => {
        console.log('Có lỗi xảy ra!');
      });
  }, [productId]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        title={I18n.t('reviewRating.count', {count: listReviewRating.length})}
        isDefault
      />
      <View style={styles.ratingWrapper}>
        <Text style={styles.label}>{rate}</Text>
        <View style={styles.row}>
          <AirbnbRating
            isDisabled={true}
            size={20}
            defaultRating={rate}
            showRating={false}
            reviewColor="#E5E5E5"
            reviewSize={14}
          />
        </View>
      </View>
      <ListReview navigation={navigation} productId={productId} />
    </ThemeView>
  );
};

ReviewRating.defaultProps = {};

ReviewRating.propTypes = {};

export default ReviewRating;
