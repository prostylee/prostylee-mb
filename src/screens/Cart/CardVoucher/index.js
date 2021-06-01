import styles from './styles';

import React from 'react';
import {View} from 'react-native';

const VoucherBackground = ({style, children}) => {
  return (
    <View style={{...styles.containerVoucher, ...style}}>
      <View style={styles.wrapVoucher}>
        <View style={styles.circleVoucherLeft} />
        <View style={styles.circleVoucherRight} />
        {children}
      </View>
    </View>
  );
};

export default VoucherBackground;
