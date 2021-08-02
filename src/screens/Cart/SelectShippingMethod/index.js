import styles from './styles';
import React from 'react';
import {View} from 'react-native';
import i18n from 'i18n';
import isEmpty from 'lodash/isEmpty';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSelectedCartAddressSelector,
  getListCartAddressSelector,
} from 'redux/selectors/cart';
import {ThemeView, Header} from 'components';
import MethodList from './MethodList';
import {cartActions} from 'reducers';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const selectedCartAddress = useSelector((state) =>
    getSelectedCartAddressSelector(state),
  );

  const listCartAddress = useSelector((state) =>
    getListCartAddressSelector(state),
  );

  const validateButton = React.useCallback(() => {
    return isEmpty(selectedCartAddress);
  }, [selectedCartAddress]);

  React.useEffect(() => {
    dispatch(cartActions.getListCartAddress());
  }, []);

  React.useEffect(() => {
    if (listCartAddress && listCartAddress.length) {
      if (isEmpty(selectedCartAddress)) {
        const defaultAddress =
          listCartAddress.find((item) => item.priority) || null;
        dispatch(
          cartActions.setSelectedCartAddress(
            defaultAddress || listCartAddress[0],
          ),
        );
      }
    }
  }, [selectedCartAddress, listCartAddress]);

  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title={i18n.t('cart.deliveryMethod')} />
      <View style={styles.wrapContent}>
        <MethodList navigation={navigation} validateButton={validateButton()} />
      </View>
    </ThemeView>
  );
};

Cart.defaultProps = {};

Cart.propTypes = {};

export default Cart;
