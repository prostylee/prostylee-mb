import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';

const ModalIndicator = ({style, visible}) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={visible}
      animationOutTiming={20}
      backdropOpacity={0.1}>
      <View style={styles.containerAlert}>
        <ActivityIndicator size="large" color="#823FFD" style={style} />
      </View>
    </Modal>
  );
};

export default ModalIndicator;
