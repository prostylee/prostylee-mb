import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';

const ModalNetworkWarning = (props) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={props.visible}
      animationOutTiming={20}
      backdropOpacity={0.3}>
      <View style={styles.containerAlert}>
        <View style={styles.modalAlert}>
          <Text style={styles.textTitle}>Không có kết nối</Text>
          <Text style={styles.message}>
            Vui lòng kết nối wifi hoặc dữ liệu di động để sử dụng các tính năng
            của ứng dụng
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNetworkWarning;
