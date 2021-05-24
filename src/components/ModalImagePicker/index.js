import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './styles';

import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';

const IC_GALLERY = require('assets/icons/gallery.png');
const IC_CAMERA = require('assets/icons/camera.png');

const ModalImagePicker = (props) => {
  const openGallery = async () => {
    try {
      let image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: props.cropping ? props.cropping : false,
        compressImageQuality: 0.8,
        includeBase64: true,
        mediaType: 'photo',
      });
      props.onGetValue(image);
    } catch (err) {
      console.log(err);
      props.onCancel();
    }
  };

  const openCamera = async () => {
    try {
      let image = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: props.cropping ? props.cropping : false,
        compressImageQuality: 0.8,
        includeBase64: true,
        mediaType: 'photo',
      });
      props.onGetValue(image);
    } catch (err) {
      console.log(err);
      props.onCancel();
    }
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      transparent={true}
      isVisible={props.visible}
      animationOutTiming={20}
      backdropOpacity={0.3}>
      <SafeAreaView style={styles.containerAlert}>
        <View style={styles.modalAlert}>
          <View style={styles.body}>
            <Text style={styles.title}>Chọn ảnh</Text>
            <TouchableWithoutFeedback onPress={() => openGallery()}>
              <View style={styles.row}>
                <Image
                  source={IC_GALLERY}
                  style={styles.icon}
                  resizeMode="contain"
                  tintColor="#0066b8"
                />

                <Text style={styles.label}>Chọn từ thư viện ảnh</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => openCamera()}>
              <View style={[styles.row, styles.border]}>
                <Image
                  source={IC_CAMERA}
                  style={styles.icon}
                  resizeMode="contain"
                  tintColor="#0066b8"
                />
                <Text style={styles.label}>Chụp từ camera</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.footer}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>HỦY</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ModalImagePicker.propTypes = {
  visible: PropTypes.bool,
  cropping: PropTypes.bool,
  onCancel: PropTypes.func,
  onGetValue: PropTypes.func,
};

export default ModalImagePicker;
