import styles from './styles';

import React, {useEffect} from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import ListProduct from './ListProduct';
import {Header, ThemeView} from 'components';

const RateProduct = ({navigation}) => {

  useEffect(() => {}, []);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header title={I18n.t('rateProduct.choose')} isDefault />
      <ListProduct navigation={navigation} />
    </ThemeView>
  );
};

export default RateProduct;
