import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

import ButtonRounded from '../ButtonRounded';

import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

const ModalRequireUpdate = (props) => {
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
          <Text style={styles.textTitle}>Cập nhật ứng dụng</Text>
          <Text style={styles.message}>
            Đã có phiên bản mới, vui lòng cập nhật để có những trải nghiệm tốt
            hơn
          </Text>

          <View style={styles.wrapperBtn}>
            <ButtonRounded
              title="Cập nhật ngay"
              style={styles.customBtn}
              titleStyle={styles.titleStyle}
              onPress={props.onConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalRequireUpdate.propTypes = {
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
};

export default ModalRequireUpdate;
