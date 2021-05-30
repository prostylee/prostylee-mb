import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';

import {ThemeView, Header} from 'components';
import ListProduct from './ListProduct';

const Cart = ({navigation}) => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.payment')} />
      <View style={styles.wrapContent}>
        <ListProduct navigation={navigation} />
      </View>
    </ThemeView>
  );
};

Cart.defaultProps = {};

Cart.propTypes = {};

export default Cart;
