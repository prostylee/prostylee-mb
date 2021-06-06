import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {TicketOrange} from 'svg/common';

const PromotionsInfo = ({onPromoNotiPress = () => {}}) => (
  <TouchableOpacity
    style={styles.promoInfoContainer}
    onPress={onPromoNotiPress}>
    <View style={styles.iconContainer}>
      <TicketOrange />
    </View>
    <View style={styles.promoTextContainer}>
      <Text style={styles.title}>Thông tin khuyễn mãi </Text>
      <Text style={styles.subTitle}>
        Cập nhật các tin tức khuyễn mãi mới nhất
      </Text>
    </View>
  </TouchableOpacity>
);

export default PromotionsInfo;
