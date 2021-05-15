import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import styles from './styles';

import {ThemeView, Header, Image} from 'components';
import RightCategories from './Right';
import LeftCategories from './Left';

const Categories = () => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('headerTitle.categories')} />
      <View style={styles.wrapContent}>
        <View style={styles.wrapLeftContent}>
          <LeftCategories />
        </View>
        <View style={styles.wrapRightContent}>
          <View style={styles.wrapRightBanner}>
            <Image
              style={styles.imageBanner}
              source={{uri: 'http://placehold.it/400x200?text=Banner 2x1'}}
            />
          </View>
          <RightCategories />
        </View>
      </View>
    </ThemeView>
  );
};

Categories.defaultProps = {};

Categories.propTypes = {};

export default Categories;
