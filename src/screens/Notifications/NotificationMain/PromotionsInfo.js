import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TicketOrange} from 'svg/common';
import i18n from 'i18n';
const PromotionsInfo = ({onPromoNotiPress = () => {}}) => (
  <TouchableOpacity
    style={styles.promoInfoContainer}
    onPress={onPromoNotiPress}>
    <View style={styles.iconContainer}>
      <TicketOrange />
    </View>
    <View style={styles.promoTextContainer}>
      <Text style={styles.title}>{i18n.t('Notification.saleOfInfo')}</Text>
      <Text style={styles.subTitle}>
        {i18n.t('Notification.updateNewVoucher')}
      </Text>
    </View>
  </TouchableOpacity>
);

export default PromotionsInfo;
