/* eslint-disable react-hooks/rules-of-hooks */
import styles from './styles';
import React, {useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {LocationIcon} from 'svg/common';
import i18n from 'i18n';

const CardAddress = ({navigation}) => {
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
          <TouchableOpacity style={styles.buttonChangeAddress}>
            <Text style={styles.labelChangeAddress}>
              {i18n.t('cart.changeAddress')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.wrapAddressContent}>
        <Text style={styles.valueAddress} numberOfLines={2}>
          184A Trịnh Đình Trọng, Phú Trung, Tân Phú, TPHCM
        </Text>
      </View>
    </View>
  );
};

CardAddress.defaultProps = {};

CardAddress.propTypes = {};

export default CardAddress;
