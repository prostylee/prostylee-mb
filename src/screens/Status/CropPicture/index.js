import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {ContainerWithoutScrollView} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {Storage} from 'aws-amplify';
import {userTokenSelector} from 'redux/selectors/user';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {CropView} from 'react-native-image-crop-tools';
import {Header} from 'components';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const statusImageRatio = 5 / 4;
const IC_BACK = require('assets/icons/arrowLeft.png');

const CropPicture = (props) => {
  const dispatch = useDispatch();
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const cropViewRef = React.useRef();
  const [cropImage, setCropImage] = React.useState({});
  const [afterCropImages, setAfterCropImages] = React.useState([]);
  //route
  const route = useRoute();
  const navigation = useNavigation();
  const images = route?.params.images || [];
  const isCropList = images.length > 1 ? true : false;

  React.useEffect(() => {
    if (images.length) {
      setCropImage({uri: images[0].path, index: 0});
    }
  }, []);

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  const saveCropImage = () => {
    cropViewRef.current.saveImage(90);
  };

  //Theme
  const {colors} = useTheme();

  const CropVewStyle = isCropList
    ? {width: WIDTH, height: HEIGHT - notchHeight - 100}
    : {
        width: WIDTH,
        height: HEIGHT - notchHeight,
      };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <Header
          isDefault
          title={''}
          containerStyle={styles.headerContainer}
          leftIcon={<Image source={IC_BACK} style={styles.headerImage} />}
          rightComponent={
            <TouchableOpacity style={styles.cropButton} onPress={saveCropImage}>
              <Text style={styles.cropText}>
                {isCropList ? 'Crop All' : 'Crop'}
              </Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.mainWrapper}>
          {cropImage && cropImage.uri ? (
            <CropView
              sourceUrl={cropImage.uri}
              style={CropVewStyle}
              ref={cropViewRef}
              onImageCrop={(res) => {
                let imageData = afterCropImages;
                const newImageData = {uri: res.uri, index: cropImage.index};
                imageData[newImageData.index] = newImageData;
                setAfterCropImages(imageData);
                navigation.navigate('AddStatus', {images: imageData});
              }}
              keepAspectRatio
              aspectRatio={{width: 4, height: 5}}
            />
          ) : null}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default CropPicture;
