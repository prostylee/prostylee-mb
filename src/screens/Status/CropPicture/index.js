import React from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import i18n from 'i18n';
import {ContainerWithoutScrollView} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import styles from './styles';
import Carousel from 'react-native-snap-carousel';
import {useBackHandler} from '@react-native-community/hooks';
import {CropView} from 'react-native-image-crop-tools';
import {Header} from 'components';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const IC_BACK = require('assets/icons/arrowLeft.png');
let activeIndex = 0;

const CropPicture = () => {
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
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
  const [checkImage, setCheckImage] = React.useState([]);
  //route
  const route = useRoute();
  const navigation = useNavigation();
  const images = route?.params.images || [];
  const isCropList = images.length > 1 ? true : false;

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  const cropAllImage = () => {
    if (checkImage.every((item) => item)) {
      images.forEach(async (_, index) => {
        await cropViewRefList[index].current.saveImage(90);
      });
    } else {
      showMessage({
        message: i18n.t('addStatus.checkAll'),
        type: 'danger',
      });
    }
  };

  const checkAllCropImage = () => {
    if (afterCropImages.length === images.length) {
      navigation.navigate('AddStatus', {images: afterCropImages});
    }
  };

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

  const RenderCropView = ({item, index}) => {
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
  };

  const CropImagesList = React.useMemo(() => {
    return (
      <Carousel
        ref={cropsRef}
        data={images}
        activeSlideOffset
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
            <TouchableOpacity style={styles.cropButton} onPress={cropAllImage}>
              <Text style={styles.cropText}>
                {isCropList ? 'Crop All' : 'Crop'}
              </Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.mainWrapper}>{CropImagesList}</View>
        {isCropList ? <ThumbImagesList /> : null}
      </ContainerWithoutScrollView>
    </View>
  );
};

export default CropPicture;
