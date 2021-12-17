import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, Image} from 'components';
import RightCategories from './Right';
import LeftCategories from './Left';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {productActions} from 'redux/reducers';
const Categories = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [banner, setBanner] = React.useState('');

  React.useEffect(() => {
    if (isFocused) {
      dispatch(productActions.clearProductCategoriesFilterState());
    }
  }, [isFocused]);
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('headerTitle.categories')} />
      <View style={styles.wrapContent}>
        <View style={styles.wrapLeftContent}>
          <LeftCategories setBanner={setBanner} />
        </View>
        <View style={styles.wrapRightContent}>
          <View style={styles.wrapRightBanner}>
            {banner ? (
              <Image style={styles.imageBanner} source={{uri: banner}} />
            ) : (
              <Image
                style={styles.imageBanner}
                source={require('assets/images/default.png')}
              />
            )}
          </View>
          <RightCategories navigation={navigation} />
        </View>
      </View>
    </ThemeView>
  );
};

Categories.defaultProps = {};

Categories.propTypes = {};

export default Categories;
