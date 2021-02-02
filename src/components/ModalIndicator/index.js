import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';

import {colorApp} from '../../utils';

const ModalIndicator = ({style, visible}) => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    transparent={true}
    isVisible={visible}
    animationOutTiming={20}
    backdropOpacity={0.3}>
    <View style={styles.containerAlert}>
      <ActivityIndicator size="large" color={colorApp} style={style} />
    </View>
  </Modal>
);

export default ModalIndicator;
