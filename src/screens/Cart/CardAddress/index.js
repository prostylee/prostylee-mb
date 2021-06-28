/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {LocationIcon} from 'svg/common';
import i18n from 'i18n';
import {useSelector} from 'react-redux';
import {userSelectors} from 'reducers';
import {cartActions} from 'reducers';
import {
  getListCartAddressLoadingSelector,
  getListCartAddressSelector,
  getListCartAddressHistorySelector,
} from 'redux/selectors/cart';

const CardAddress = ({navigation}) => {
  const location = useSelector((state) => userSelectors.getUserLocation(state));
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
              navigation.navigate('AddressRecent', {
                getListAddressAction: cartActions.getListCartAddress,

                getListAddressSelectorFunc: getListCartAddressSelector,

                getListAddressHistorySelectorFunc:
                  getListCartAddressHistorySelector,

                getListAddressLoadingSelectorFunc:
                  getListCartAddressLoadingSelector,

                setSelectedAddressAction: cartActions.setSelectedCartAddress,

                setSelectedAddressHistoryAction:
                  cartActions.setSelectedCartAddressHistory,
              });
            }}>
            <Text style={styles.labelChangeAddress}>
              {i18n.t('cart.changeAddress')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapAddressContent}>
        <Text style={styles.valueAddress}>{location?.address}</Text>
      </View>
    </View>
  );
};

CardAddress.defaultProps = {};

CardAddress.propTypes = {};

export default CardAddress;
