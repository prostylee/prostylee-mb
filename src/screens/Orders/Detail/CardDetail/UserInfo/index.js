import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {LocationIcon} from 'svg/common';
import Header from '../Header';
import i18n from 'i18n';

const UserInfo = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header icon={<LocationIcon />} title={i18n.t('orders.orderAddress')} />
      <View style={styles.wrapUserBody}>
        <View>
          <Text style={styles.labelName}>Nguyễn Hữu Pháp</Text>
        </View>
        <View>
          <Text style={styles.labelInfo}>0123456789</Text>
        </View>
        <View>
          <Text style={styles.labelInfo}>
            56 Nguyễn Đình Chiểu, ĐaKao, Quận 1, TPHCM
          </Text>
        </View>
      </View>
    </View>
  );
};

UserInfo.defaultProps = {};

UserInfo.propTypes = {};

export default UserInfo;
