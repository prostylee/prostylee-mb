import styles from './styles';
import React from 'react';
import {View, Text} from 'react-native';
import {LocationIcon} from 'svg/common';
import Header from '../Header';
import i18n from 'i18n';

const UserInfo = ({navigation, infor = {}}) => {
  return (
    <View style={styles.container}>
      <Header icon={<LocationIcon />} title={i18n.t('orders.orderAddress')} />
      <View style={styles.wrapUserBody}>
        <View>
          <Text style={styles.labelName}>{infor?.fullName}</Text>
        </View>
        <View>
          <Text style={styles.labelInfo}>{infor?.phoneNumber}</Text>
        </View>
        <View>
          <Text style={styles.labelInfo}>
            {`${infor?.address1}, ${infor?.address2}, ${infor?.state}, ${infor?.city}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

UserInfo.defaultProps = {};

UserInfo.propTypes = {};

export default UserInfo;
