import styles from './styles';

import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import ListReview from './ListReview';
import {useDispatch} from 'react-redux';
import {Container, Header, ThemeView, RnRatingTap} from 'components';

import I18n from 'i18n';

const ReviewRating = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onGoBack = () => {
    navigation.goBack();
  };

  const onChangeRating = (rating) => {
    console.log('rating is: ', rating);
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header title={I18n.t('reviewRating.count', {count: 15})} isDefault />
      <View style={styles.ratingWrapper}>
        <Text style={styles.label}>4.6</Text>
        <View style={styles.row}>
          <RnRatingTap
            onChangeValue={onChangeRating}
            value={4.6}
            isDisabled={true}
            size={20}
          />
        </View>
      </View>
      <ListReview navigation={navigation} />
    </ThemeView>
  );
};

export default ReviewRating;
