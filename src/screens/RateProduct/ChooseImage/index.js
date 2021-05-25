import styles from './styles';

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ActivityIndicator, Text, View} from 'react-native';
/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {Image} from 'components';
import {UploadIcon} from 'svg/common';
import ImagePicker from 'react-native-image-crop-picker';

import {commonActions} from 'reducers';

const ChooseImage = ({
  onSuccess,
  label,
  images,
  setImages,
  length = 5,
  pickerConfig,
}) => {
  const [tempArray, setTempArray] = useState(
    new Array(length - images.length - 2).fill(),
  );

  useEffect(() => {
    setTempArray(new Array(length - images.length - 2).fill());
  }, [JSON.stringify(images)]);

  const openImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
      ...pickerConfig,
    })
      .then((res) => {
        console.log(res);
        alert(res);
        const tempImage = [...images, {source: res.sourceURL, id: res.filename}];
        setImages(tempImage);
        if (typeof onSuccess === 'function') {
          onSuccess(tempImage);
        }
        // RootNavigator.navigate('AddStory', {image: res});
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={styles.listImageUpload}>
        {images?.length > 0 &&
          images.map((item) => (
            <Image
              key={images.id}
              source={
                item.url
                  ? {uri: item?.url}
                  : item.source
                  ? item.source
                  : require('assets/images/default.png')
              }
              style={styles.imageChoose}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}

        {images?.length < length - 1 && (
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.btnImageUpload}>
            <View style={styles.buttonUpload}>
              <UploadIcon />
            </View>
          </TouchableOpacity>
        )}
        {tempArray.length > 0 &&
          tempArray.map((item, index) => (
            <View
              style={styles.buttonUploadEmpty}
              key={`empty-${index}`}></View>
          ))}
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
