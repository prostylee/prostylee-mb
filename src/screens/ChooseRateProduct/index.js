import styles from './styles';

import React, {useEffect} from 'react';

/*Hooks*/
import I18n from 'i18n';

/*Components*/
import ListProduct from './ListProduct';
import {Header, ThemeView} from 'components';
import {useRoute} from '@react-navigation/native';

const RateProduct = ({navigation}) => {
  const route = useRoute();

  const listProduct = route?.params?.listProduct || [];

  return (
    <ThemeView style={styles.container} isFullView>
      <Header title={I18n.t('rateProduct.choose')} isDefault />
      <ListProduct navigation={navigation} data={listProduct} />
    </ThemeView>
  );
};

export default RateProduct;
