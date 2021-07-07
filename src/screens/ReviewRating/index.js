import styles from './styles';

import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {View, Text, ActivityIndicator} from 'react-native';
import ListReview from './ListReview';
import {
  Header,
  ThemeView,
  AirbnbRating,
  Colors,
  CustomRating,
} from 'components';

/*Api*/
import {getAverage} from 'services/api/reviewRatingApi';

/*Selector*/
import {getListReviewRatingSelector} from 'redux/selectors/reviewRating';
import {showMessage} from 'react-native-flash-message';

const ReviewRating = ({navigation}) => {
  const route = useRoute();
  const productId = route?.params?.productId || 0;
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(0);

  const listReviewRatingSelector = useSelector((state) =>
    getListReviewRatingSelector(state),
  );

  const listReviewRating = listReviewRatingSelector?.content || [];

  useEffect(() => {
    getAverage(productId)
      .then((res) => {
        setLoading(false);
        setRate(res.data.data || 0);
      })
      .catch(() => {
        setLoading(false);
        showMessage({
          message: I18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
  }, [productId]);

  return (
    <ThemeView style={styles.container} isFullView>
      {loading ? (
        <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
          <ActivityIndicator animating color={Colors.$purple} size="small" />
        </View>
      ) : (
        <>
          <Header
            title={I18n.t('reviewRating.count', {
              count: listReviewRating.length,
            })}
            isDefault
          />
          <View style={styles.ratingWrapper}>
            <View style={styles.wrapLabel}>
              <Text style={styles.label}>{parseFloat(rate).toFixed(1)}</Text>
            </View>
            <View style={styles.row}>
              <CustomRating rate={parseFloat(rate).toFixed(1)} size={24} />
            </View>
          </View>
          <ListReview navigation={navigation} productId={productId} />
        </>
      )}
    </ThemeView>
  );
};

ReviewRating.defaultProps = {};

ReviewRating.propTypes = {};

export default ReviewRating;
