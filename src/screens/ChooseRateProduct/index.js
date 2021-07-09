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
  const onBackPress = route?.params?.onBackPress || (() => {});
  const listProduct =
    route?.params?.listProduct?.filter(
      (item) => !item?.productData?.reviewedStatusOfUserLogin,
    ) || [];

  const listProductRef = React.useRef();

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        title={I18n.t('rateProduct.choose')}
        isDefault
        leftPress={() => {
          if (
            listProductRef &&
            listProductRef?.current &&
            listProductRef?.current?.hasRefresh
          ) {
            onBackPress();
          }
        }}
      />
      <ListProduct
        navigation={navigation}
        data={listProduct}
        ref={listProductRef}
      />
    </ThemeView>
  );
};

export default RateProduct;
