import styles from './styles';

import React from 'react';

/*Hooks*/
import I18n from 'i18n';
import {useSelector} from 'react-redux';
import {getRatedListSelector} from 'redux/selectors/reviewRating';
/*Components*/
import ListProduct from './ListProduct';
import {Header, ThemeView} from 'components';
import {useRoute} from '@react-navigation/native';

const RateProduct = ({navigation}) => {
  const route = useRoute();
  const ratedList = useSelector(getRatedListSelector);
  const onBackPress = route?.params?.onBackPress || (() => {});

  const listProduct =
    route?.params?.listProduct?.filter(
      (item) =>
        !item?.productData?.reviewedStatusOfUserLogin &&
        !ratedList?.includes(item?.productData?.id),
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
