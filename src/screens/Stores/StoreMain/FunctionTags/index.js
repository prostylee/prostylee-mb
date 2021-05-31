import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
          <Text style={styles.tagName}>Shop gần đây</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('Vouchers')}>
          <TicketIconWithColor />
          <Text style={styles.tagName}>Mã khuyễn mãi</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('BestSeller')}>
          <BestSellerIcon />
          <Text style={styles.tagName}>Best-seller</Text>
        </TouchableOpacity>
        <DashLine />
        <TouchableOpacity
          style={styles.tagItem}
          onPress={() => navigation.navigate('PersonalSalers')}>
          <CartIconColor />
          <Text style={styles.tagName}>Cá nhân đăng bán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FunctionTags;
