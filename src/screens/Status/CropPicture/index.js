import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
import {ThemeView, Header} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {
  useTheme,
  useRoute,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import {useBackHandler} from '@react-native-community/hooks';
import {CropView} from 'react-native-image-crop-tools';
import ImageCropper from '@locnguyen309/react-native-simple-image-crop';
import * as ImageManipulator from '@pontusab/react-native-image-manipulator';
import {commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const IC_BACK = require('assets/icons/arrowLeft.png');
let activeIndex = 0;

const CropPicture = () => {
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  //route
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const images = route?.params.images || [];
  const isCropList = images.length > 1 ? true : false;
  /******** iOS ********/
  const cropsRef = React.useRef();
  const cropViewRef0 = React.useRef();
  const cropViewRef1 = React.useRef();
  const cropViewRef2 = React.useRef();
  const cropViewRef3 = React.useRef();
  const cropViewRefList = [
    cropViewRef0,
    cropViewRef1,
    cropViewRef2,
    cropViewRef3,
  ];

  const [afterCropImages, setAfterCropImages] = React.useState([]);
  /******** iOS ********/
  const [checkImage, setCheckImage] = React.useState([]);

  /******** Android ********/
  const cropWidth = Dimensions.get('window').width;
  const cropHeight =
    Dimensions.get('window').height - notchHeight - 64 - (isCropList ? 100 : 0);
  let cropperWidth = 0;
  let cropperHeight = 0;
  if (cropHeight / cropWidth > 5 / 4) {
    cropperWidth = cropWidth - 8;
    cropperHeight = ((cropWidth - 8) / 4) * 5;
  } else {
    cropperHeight = cropHeight - 8;
    cropperWidth = ((cropHeight - 8) / 5) * 4;
  }
  const cropSize = {
    width: cropperWidth,
    height: cropperHeight,
  };
  const cropAreaSize = {
    width: cropperWidth,
    height: cropperHeight,
  };
  const [cropperParams0, setCropperParams0] = React.useState({});
  const [cropperParams1, setCropperParams1] = React.useState({});
  const [cropperParams2, setCropperParams2] = React.useState({});
  const [cropperParams3, setCropperParams3] = React.useState({});

  /******** Android ********/

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  const autoCropAllImage = async () => {
    let imageData = afterCropImages;
    dispatch(commonActions.toggleLoading(true));
    try {
      images.forEach(async (item, index) => {
        if (index === 0) {
          imageData[0] = null;
          if (Platform.OS === 'ios') {
            await cropViewRefList[0].current.saveImage(90);
          }
        } else {
          imageData[index] = null;
          let defaultWidth = 0;
          let defaultHeight = 0;
          let topLeftCorner = {};
          const imageHeight = item.height;
          const imageWidth = item.width;
          if (imageHeight / imageWidth > 5 / 4) {
            defaultWidth = imageWidth;
            defaultHeight = Math.round((imageWidth / 4) * 5);
            topLeftCorner = {
              originX: 0,
              originY: Math.round((imageHeight - defaultHeight) / 2),
            };
          } else {
            defaultHeight = imageHeight;
            defaultWidth = Math.round((imageHeight / 5) * 4);
            topLeftCorner = {
              originX: Math.round((imageWidth - defaultWidth) / 2),
              originY: 0,
            };
          }
          if (Platform.OS === 'ios') {
            const cropImageResult = await ImageManipulator.manipulateAsync(
              item.sourceURL,
              [
                {
                  crop: {
                    originX: topLeftCorner.originX,
                    originY: topLeftCorner.originY,
                    width: defaultWidth,
                    height: defaultHeight,
                  },
                },
              ],
              {compress: 1, format: ImageManipulator.SaveFormat.PNG},
            );
            const newImageData = {uri: cropImageResult.uri, index: index};
            imageData[newImageData.index] = newImageData;
            setAfterCropImages(imageData);
            checkAllCropImage();
          } else {
            const cropImageResult = await ImageManipulator.manipulateAsync(
              item.path,
              [
                {
                  crop: {
                    originX: topLeftCorner.originX,
                    originY: topLeftCorner.originY,
                    width: Math.round((defaultWidth * 3) / 4), // Android error bitmap
                    height: Math.round((defaultHeight * 3) / 4), // Android error bitmap
                  },
                },
              ],
              {compress: 1, format: ImageManipulator.SaveFormat.PNG},
            );
            const newImageData = {uri: cropImageResult.uri, index: index};
            imageData[newImageData.index] = newImageData;
            setAfterCropImages(imageData);
            checkAllCropImage();
            if (index === images.length - 1) {
              await handleCropAndroid(0);
            }
          }
        }
      });
    } catch (_) {
      dispatch(commonActions.toggleLoading(false));
      showMessage({
        message: i18n.t('addStatus.checkAll'),
        type: 'danger',
        position: 'top',
      });
    }
  };

  const cropAllImage = () => {
    if (checkImage.every((item) => item)) {
      if (Platform.OS === 'ios') {
        images.forEach(async (_, index) => {
          await cropViewRefList[index].current.saveImage(90);
        });
      } else if (Platform.OS === 'android') {
        images.forEach(async (_, index) => {
          await handleCropAndroid(index);
        });
      }
    } else {
      Alert.alert(i18n.t('caution'), i18n.t('addStatus.ignoreCheckAll'), [
        {text: i18n.t('addStatus.ignoreCheckAllRecheck'), onPress: () => {}},
        {
          text: i18n.t('addStatus.ignoreCheckAllContinue'),
          onPress: () => autoCropAllImage(),
        },
      ]);
    }
  };

  const checkAllCropImage = () => {
    if (afterCropImages.length === images.length) {
      if (afterCropImages.every((item, index) => item)) {
        dispatch(commonActions.toggleLoading(false));
        navigation.navigate('AddStatus', {images: afterCropImages});
      }
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      activeIndex = 0;
    }
  }, [isFocused]);

  React.useEffect(() => {
    checkAllCropImage();
  }, [JSON.stringify(afterCropImages)]);

  React.useEffect(() => {
    images.forEach((_, index) => {
      setCheckImage((prev) => {
        const newData = new Array(...prev);
        if (index === 0) {
          newData[index] = true;
        } else {
          newData[index] = false;
        }
        return newData;
      });
    });
  }, []);

  const CropViewStyle = isCropList
    ? {width: WIDTH, height: HEIGHT - notchHeight - 100}
    : {
        width: WIDTH,
        height: HEIGHT - notchHeight,
      };

  const cropperParams = (index) => {
    if (index === 0) {
      return cropperParams0;
    } else if (index === 1) {
      return cropperParams1;
    } else if (index === 2) {
      return cropperParams2;
    } else if (index === 3) {
      return cropperParams3;
    } else {
      return {};
    }
  };
  const handleCropAndroid = React.useCallback(
    async (index) => {
      const croppedImage =
        Platform.OS === 'ios' ? images[index].sourceURL : images[index].path;
      const currentParams = cropperParams(index);
      try {
        const result = await ImageCropper.crop({
          ...currentParams,
          imageUri: croppedImage,
          cropSize,
          cropAreaSize,
        });
        let imageData = afterCropImages;
        const newImageData = {uri: result, index: index};
        imageData[newImageData.index] = newImageData;
        setAfterCropImages(imageData);
        checkAllCropImage();
      } catch (error) {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      }
    },
    [cropperParams0, cropperParams1, cropperParams2, cropperParams3],
  );

  const setCropperParamsFunc = (params, index) => {
    switch (index) {
      case 0:
        setCropperParams0(params);
        break;
      case 1:
        setCropperParams1(params);
        break;
      case 2:
        setCropperParams2(params);
        break;
      case 3:
        setCropperParams3(params);
        break;
      default:
        return;
    }
  };

  const overlayStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  };

  const overlayBorder = (index) => {
    return {
      width: cropperWidth / 3,
      height: cropperHeight / 3,
      borderTopWidth: 1,
      borderTopColor: '#FFF',
      borderBottomWidth: index >= 6 ? 1 : 0,
      borderBottomColor: '#FFF',
      borderLeftWidth: 1,
      borderLeftColor: '#FFF',
      borderRightWidth: index % 3 === 2 ? 1 : 0,
      borderRightColor: '#FFF',
    };
  };

  const RenderCropView = ({item, index}) => {
    if (Platform.OS === 'android') {
      return (
        <View style={styles.androidListContainer}>
          <ImageCropper
            imageUri={Platform.OS === 'ios' ? item.sourceURL : item.path}
            cropAreaWidth={cropperWidth}
            cropAreaHeight={cropperHeight}
            containerColor="#333"
            areaColor="#333"
            areaOverlay={
              <View style={overlayStyle}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                  <View style={overlayBorder(index)} key={`overlay_${index}`} />
                ))}
              </View>
            }
            setCropperParams={(params) => setCropperParamsFunc(params, index)}
          />
        </View>
      );
    } else if (Platform.OS === 'ios') {
      return (
        <CropView
          sourceUrl={Platform.OS === 'ios' ? item.sourceURL : item.path}
          style={CropViewStyle}
          ref={cropViewRefList[index]}
          onImageCrop={(res) => {
            let imageData = afterCropImages;
            const newImageData = {uri: res.uri, index: index};
            imageData[newImageData.index] = newImageData;
            setAfterCropImages(imageData);
            checkAllCropImage();
          }}
          keepAspectRatio
          aspectRatio={{width: 4, height: 5}}
        />
      );
    }
  };

  const CropImagesList = React.useMemo(() => {
    return (
      <Carousel
        ref={cropsRef}
        data={images}
        activeSlideOffset={0}
        initialNumToRender={4}
        renderItem={({item, index}) => {
          return <RenderCropView item={item} index={index} />;
        }}
        activeSlideAlignment={'start'}
        sliderWidth={WIDTH * images.length}
        itemWidth={WIDTH}
        scrollEnabled={false}
        style={CropViewStyle}
        onSnapToItem={(index) =>
          setCheckImage((prev) => {
            const newData = new Array(...prev);
            newData[index] = true;
            return newData;
          })
        }
        enableMomentum={true}
        decelerationRate={0.9}
      />
    );
  }, [images]);

  const ThumbImagesList = () => {
    const [activeCrop, setActiveCrop] = React.useState(activeIndex);
    return (
      <View style={styles.thumbList}>
        {images.map((item, index) => {
          return (
            <TouchableOpacity
              key={`crop_thumb_${index}`}
              activeOpacity={0.8}
              style={styles.thumbItemContainer}
              onPress={() => {
                setActiveCrop(index);
                activeIndex = index;
                cropsRef.current.snapToItem(index);
              }}>
              <Image
                style={[
                  styles.thumbItem,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    borderColor:
                      activeCrop === index ? '#3470FB' : 'transparent',
                  },
                ]}
                source={{
                  uri: afterCropImages[index]
                    ? afterCropImages[index].path
                    : images[index].path,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <ThemeView style={styles.container} isFullView>
      <Header
        isDefault
        title={''}
        containerStyle={styles.headerContainer}
        leftIcon={<Image source={IC_BACK} style={styles.headerImage} />}
        rightComponent={
          <TouchableOpacity style={styles.cropButton} onPress={cropAllImage}>
            <Text style={styles.cropText}>
              {isCropList
                ? i18n.t('addStatus.cropAll')
                : i18n.t('addStatus.cropSingle')}
            </Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.mainWrapper}>{CropImagesList}</View>
      {isCropList ? <ThumbImagesList /> : null}
    </ThemeView>
  );
};

export default CropPicture;
