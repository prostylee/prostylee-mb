import React from 'react';
import {View} from 'react-native';
import {ThemeView, Header} from 'components';

import styles from './style';

const Vouchers = () => {
  return (
    <ThemeView style={styles.container} isFullView>
      <Header isDefault title="Mã khuyến mãi" />
    </ThemeView>
  );
};
export default Vouchers;
