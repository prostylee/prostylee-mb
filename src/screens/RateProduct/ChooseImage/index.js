import styles from './styles';

import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  View,
  Image,
} from 'react-native';

/*Components*/

import {UploadIcon} from 'svg/common';
import ImagePicker from 'react-native-image-crop-picker';

const ChooseImage = ({label, images, setImages, length = 5, pickerConfig}) => {
  const openImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 4,
    })
      .then((res) => {
        let listImage = res?.map((item) => ({
          source: item?.path,
          id: item.filename,
        }));
        listImage = handlePushNewImage(listImage);

        if (typeof setImages === 'function') {
          setImages(listImage);
        }
      })
      .catch((e) => console.log(e));
  };
  const handlePushNewImage = (listImagePicked = []) => {
    let newListImage = [];
    if (images.length) {
      if (listImagePicked.length + images.length <= 4) {
        newListImage = newListImage
          .concat([...images])
          .concat([...listImagePicked]);
      } else {
        let lengthRemove = 4 - images.length;
        newListImage = [...images];
        newListImage.splice(0, lengthRemove);
        newListImage = listImagePicked.concat([...newListImage]);
      }
    } else {
      newListImage = [...listImagePicked];
    }
    return newListImage;
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.listImageUpload}>
        {images && images.length ? (
          [0, 1, 2, 3].map((index) => {
            if (index < images.length) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={openImagePicker}
                  style={styles.btnImageUpload}>
                  <Image
                    source={
                      images[index].source
                        ? {uri: images[index].source}
                        : require('assets/images/default.png')
                    }
                    style={styles.imageChoose}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </TouchableOpacity>
              );
            }
            if (index === images?.length) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={openImagePicker}
                  style={styles.btnImageUpload}>
                  <View style={styles.buttonUpload}>
                    <UploadIcon />
                  </View>
                </TouchableOpacity>
              );
            }
            return (
              <View key={`choose-${index}`} style={styles.buttonUploadEmpty} />
            );
          })
        ) : (
          <>
            <TouchableOpacity
              onPress={openImagePicker}
              style={styles.btnImageUpload}>
              <View style={styles.buttonUpload}>
                <UploadIcon />
              </View>
            </TouchableOpacity>
            <View style={styles.buttonUploadEmpty} />
            <View style={styles.buttonUploadEmpty} />
            <View style={styles.buttonUploadEmpty} />
          </>
        )}
      </View>
    </View>
  );
};

ChooseImage.defaultProps = {
  images: [],
  length: 5,
  pickerConfig: {},
};

export default ChooseImage;
