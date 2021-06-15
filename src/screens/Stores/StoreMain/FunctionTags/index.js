import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import i18n from 'i18n';
import styles from './style';
import {
  DashLine,
  MapIconWithColor,
  TicketIconWithColor,
  BestSellerIcon,
  CartIconColor,
} from 'svg/common';

const FunctionTags = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.tagListContainer}>
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('NearbyStore')}>
          <MapIconWithColor />
          <Text style={styles.tagName}>{i18n.t('stores.nearbyShop')}</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('Vouchers')}>
          <TicketIconWithColor />
          <Text style={styles.tagName}>{i18n.t('stores.voucher')}</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('BestSeller')}>
          <BestSellerIcon />
          <Text style={styles.tagName}>{i18n.t('stores.bestSeller')}</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('PersonalSalers')}>
          <CartIconColor />
          <Text style={styles.tagName}>{i18n.t('stores.personalSaler')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FunctionTags;
