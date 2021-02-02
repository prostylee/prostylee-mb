import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

import I18n from 'I18n';

import Modal from 'react-native-modal';

const ModalConfirm = ({
  onCancel,
  onConfirm,
  visible,
  title,
  message,
  cancelTitle,
  confirmTitle,
}) => {
  const confTitle = confirmTitle ? confirmTitle : I18n.t('confirm');
  const cancTitle = cancelTitle ? cancelTitle : I18n.t('cancel');
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={visible}
      animationOutTiming={20}
      backdropOpacity={0.3}>
      <View style={styles.containerAlert}>
        <View style={styles.modalAlert}>
          <Text style={styles.textTitle}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.wrapperBtn}>
            <TouchableWithoutFeedback onPress={onCancel}>
              <View style={styles.wrapperTextBtnCancel}>
                <Text style={styles.buttonCancel}>{cancTitle}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onConfirm}>
              <View style={styles.wrapperTextBtnConfirm}>
                <Text style={styles.buttonOK}>{confTitle}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirm;
