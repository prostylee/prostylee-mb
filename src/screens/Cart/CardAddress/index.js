import styles from './styles';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {LocationIcon} from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import i18n from 'i18n';
import {useSelector} from 'react-redux';
import {cartActions} from 'reducers';
import {
  getListCartAddressSelector,
  getSelectedCartAddressSelector,
} from 'redux/selectors/cart';

const CardAddress = ({navigation}) => {
  const selectedCartAddress = useSelector((state) =>
    getSelectedCartAddressSelector(state),
  );

  const listCartAddress = useSelector((state) =>
    getListCartAddressSelector(state),
  );

  React.useEffect(() => {
    if (listCartAddress && listCartAddress.length) {
      if (isEmpty(selectedCartAddress)) {
        const defaultAddress =
          listCartAddress.find((item) => item.priority) || null;
        cartActions.setSelectedCartAddress(
          defaultAddress || listCartAddress[0],
        );
      }
    }
  }, [selectedCartAddress, listCartAddress]);

  return (
    <View style={styles.wrapAddress}>
      <View style={styles.wrapAddressHeader}>
        <View style={styles.wrapLabelAddress}>
          <LocationIcon />
          <Text style={styles.labelAddress}>
            &nbsp;{i18n.t('cart.yourAddress')}
          </Text>
        </View>
        <View style={styles.changeAddress}>
          <TouchableOpacity
            style={styles.buttonChangeAddress}
            onPress={() => {
              navigation.navigate('CartAddressSelect');
            }}>
            <Text style={styles.labelChangeAddress}>
              {i18n.t('cart.changeAddress')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapAddressContent}>
        {selectedCartAddress && selectedCartAddress?.fullAddress ? (
          <Text style={styles.valueAddress}>
            {selectedCartAddress.fullAddress}
          </Text>
        ) : (
          <Text style={styles.valueAddressEmpty}>
            {i18n.t('cart.addressListEmpty')}
          </Text>
        )}
      </View>
    </View>
  );
};

CardAddress.defaultProps = {};

CardAddress.propTypes = {};

export default CardAddress;
