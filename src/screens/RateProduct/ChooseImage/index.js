import styles from './styles';

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ActivityIndicator, Text, View} from 'react-native';
/*Hooks*/
import I18n from 'i18n';

/*Components*/
import {Image} from 'components';
import {UploadIcon} from 'svg/common';
import ImagePicker from 'react-native-image-crop-picker';

const ChooseImage = ({navigation, label, images}) => {
  const [tempArray, setTempArray] = useState(
    new Array(4 - (images.length + 1)).fill(),
  );

  useEffect(() => {
    setTempArray(new Array(4 - (images.length + 1)).fill());
  }, [JSON.stringify(images)]);

  const openImagePicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then((res) => {
        console.log(res);
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
              source={
                item.url
                  ? {uri: item?.url}
                  : require('assets/images/default.png')
              }
              style={styles.imageChoose}
              PlaceholderContent={<ActivityIndicator />}
            />
          ))}

        {images?.length < 4 && (
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
            <View style={styles.buttonUploadEmpty}></View>
          ))}
      </View>
    </View>
  );
};

ChooseImage.defaultProps = {
  images: [
    {
      url: 'https://i.vietgiaitri.com/2018/9/19/thoi-trang-nu-cao-cap-vay-dam-nu-528267.jpg',
    },
    {
      url: 'https://i.vietgiaitri.com/2018/9/19/thoi-trang-nu-cao-cap-vay-dam-nu-528267.jpg',
    },
  ],
};

export default ChooseImage;
