import styles from './styles';

import React from 'react';
import {View, Text} from 'react-native';
import {ButtonRounded, Colors} from 'components';
import {LinearProgress} from 'react-native-elements';
import Modal from 'react-native-modal';
import i18n from 'i18n';
import codePush from 'react-native-code-push';
import PropTypes from 'prop-types';

const ModalRequireUpdate = ({
  visible = false,
  onConfirm,
  progressUpdate,
  contentUpdate,
}) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={visible}
      animationOutTiming={20}
      backdropOpacity={0.3}
      style={styles.modalStyle}>
      <View style={[styles.containerAlert]}>
        <View style={styles.modalAlert}>
          <Text style={styles.textTitle}>
            {i18n.t('alertUpdate')} ({contentUpdate?.appVersion}.
            {contentUpdate?.label})
          </Text>
          <Text style={styles.message}>
            {progressUpdate === null
              ? i18n.t('descriptionUpdate')
              : i18n.t('descriptionProgressUpdate')}
          </Text>

          {progressUpdate !== null ? (
            <LinearProgress
              color={Colors.$purple}
              variant="determinate"
              value={progressUpdate}
            />
          ) : null}
          {progressUpdate === 1 ? (
            <View style={styles.wrapperBtn}>
              <ButtonRounded
                label={i18n.t('resetApp')}
                onPress={codePush.restartApp}
              />
            </View>
          ) : null}

          {progressUpdate === null ? (
            <View style={styles.wrapperBtn}>
              <ButtonRounded
                label={i18n.t('buttonUpdateNewVersion')}
                onPress={onConfirm}
              />
            </View>
          ) : null}
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
