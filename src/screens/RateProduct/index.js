import styles from './styles';

import React from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import RatingProduct from './RatingProduct';
import {Header, ThemeView} from 'components';

const RateProduct = ({navigation, route}) => {
  const {productId, product} = route.params;

  return (
    <>
      <ThemeView style={styles.container} isFullView>
        <Header title={I18n.t('rateProduct.title')} isDefault />
        <RatingProduct
          navigation={navigation}
          productId={productId}
          product={product}
        />
      </ThemeView>
    </>
  );
};

export default RateProduct;
