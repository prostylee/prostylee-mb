import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const Copyright = (props) => (
  <View style={styles.container}>
    <Text style={styles.copyright}>©2021 ProStylee</Text>
    <Text style={styles.center}>Điều khoản và quyền riêng tư</Text>
  </View>
);

export default Copyright;
