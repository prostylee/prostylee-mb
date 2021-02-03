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
      backdropOpacity={0.3}>
      <View style={styles.containerAlert}>
        <ActivityIndicator size="large" color="red" style={style} />
      </View>
    </Modal>
  );
};

export default ModalIndicator;
