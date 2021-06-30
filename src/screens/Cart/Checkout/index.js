import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';
import isEmpty from 'lodash/isEmpty';
import {useSelector} from 'react-redux';
import {getSelectedCartAddressSelector} from 'redux/selectors/cart';
import {ThemeView, Header} from 'components';
import ListProduct from './ListProduct';

const Cart = ({navigation}) => {
  const selectedCartAddress = useSelector((state) =>
    getSelectedCartAddressSelector(state),
  );

  const validateButton = React.useCallback(() => {
    return isEmpty(selectedCartAddress);
  }, [selectedCartAddress]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.payment')} />
      <View style={styles.wrapContent}>
        <ListProduct
          navigation={navigation}
          validateButton={validateButton()}
        />
      </View>
    </ThemeView>
  );
};

Cart.defaultProps = {};

Cart.propTypes = {};

export default Cart;
