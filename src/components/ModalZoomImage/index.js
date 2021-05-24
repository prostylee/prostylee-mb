import React from 'react';
import {View, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';

const IC_CLOSE = require('assets/icons/close.png');

import Image from '../Image';

const ModalZoomImage = ({onCancel, image_url, visible}) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={visible}
      animationOutTiming={20}
      backdropOpacity={0.7}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containerAlert}>
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.emptyView}>
              <Image
                source={IC_CLOSE}
                style={styles.ic_close}
                tintColor="#fff"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.imgWrapper}>
            <Image
              source={{uri: image_url}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.emptyView} />
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
export default ModalZoomImage;
