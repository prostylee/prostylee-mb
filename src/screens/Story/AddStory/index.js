import React from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import {ContainerWithoutScrollView, ButtonRounded} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import {Storage, Auth} from 'aws-amplify';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';
import {CropView} from 'react-native-image-crop-tools';
import ImageCropper from '@locnguyen309/react-native-simple-image-crop';

import {dim} from 'utils/common';
import {showMessage} from 'react-native-flash-message';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const BOTTOM_FOOTER_HEIGHT = 76;

const AddStory = (props) => {
  const dispatch = useDispatch();
  const cropViewRef = React.useRef();
  const [userId, setUserId] = React.useState('');
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.signInUserSession.idToken.payload.sub);
      })
      .catch((_) => {
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        });
      });
  }, []);

  //route
  const route = useRoute();
  const image = route?.params.image || '';

  const storeSelected = useSelector((state) =>
    newFeedSelectors.getNewFeedStore(state),
  );
  const customPrefix = `/public/${userId}/stories/`;

  /******** Android ********/
  const [cropperParams, setCropperParams] = React.useState({});
  const cropWidth = WIDTH;
  const cropHeight = HEIGHT - notchHeight - BOTTOM_FOOTER_HEIGHT;
  let cropperWidth = 0;
  let cropperHeight = 0;
  if (cropHeight / cropWidth > 16 / 9) {
    cropperWidth = cropWidth - 8;
    cropperHeight = ((cropWidth - 8) / 9) * 16;
  } else {
    cropperHeight = cropHeight - 8;
    cropperWidth = ((cropHeight - 8) / 16) * 9;
  }
  const cropSize = {
    width: cropperWidth,
    height: cropperHeight,
  };
  const cropAreaSize = {
    width: cropperWidth,
    height: cropperHeight,
  };
  const setCropperParamsFunc = (params) => {
    setCropperParams(params);
  };
  const handleCropAndroid = React.useCallback(async () => {
    try {
      const result = await ImageCropper.crop({
        ...cropperParams,
        imageUri: image.path,
        cropSize,
        cropAreaSize,
      });
      uploadToStorage(result);
    } catch (_) {
      showMessage({
        message: i18n.t('unknownMessage'),
        type: 'danger',
        position: 'top',
      });
    }
  }, [cropperParams]);
  /******** Android ********/

  const removeStore = async () => {
    await dispatch(newFeedActions.removeNewFeedStore());
  };

  const postStory = async (data) => {
    try {
      if (!isEmpty(storeSelected)) {
        await dispatch(
          newFeedActions.postStory({
            storeId: storeSelected.id,
            images: [
              {
                name: data.name,
                path: customPrefix,
              },
            ],
            targetType: 'user',
          }),
        );
      } else {
        await dispatch(
          newFeedActions.postStory({
            images: [
              {
                name: data.name,
                path: customPrefix,
              },
            ],
            targetType: 'user',
          }),
        );
      }
    } finally {
      removeStore();
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const uploadToStorage = async (uri) => {
    try {
      if (!uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({level: 'public'}); // public | protected | private
      const response = await fetch(uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${userId}/stories/story_${time}.jpg`;
      Storage.put(fileName, blob, {
        contentType: 'image/jpeg',
      })
        .then((result) => {
          postStory({name: `story_${time}.jpg`});
        })
        .catch((_) => {
          dispatch(commonActions.toggleLoading(false));
          Alert.alert(i18n.t('error.cannotUploadImage'));
        });
    } catch (err) {
      dispatch(commonActions.toggleLoading(false));
      Alert.alert(i18n.t('error.cannotGetImage'));
    }
  };

  const addStory = async () => {
    if (Platform.OS === 'ios') {
      await cropViewRef.current.saveImage(90);
    } else if (Platform.OS === 'android') {
      handleCropAndroid();
    }
  };
  //BackHandler handle
  useBackHandler(() => {
    showAlert();
    return true;
  });

  //Theme
  const {colors} = useTheme();

  const viewShotStyle = {
    width: WIDTH,
    height: HEIGHT - notchHeight - BOTTOM_FOOTER_HEIGHT,
    overflow: 'visible',
  };

  const cropViewAndroidStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT - notchHeight - BOTTOM_FOOTER_HEIGHT,
    overflow: 'visible',
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

  // Add alert for button back to comfirm

  function showAlert() {
    Alert.alert(i18n.t('addStatus.alertTitle'), i18n.t('addStatus.alert'), [
      {
        text: i18n.t('addStatus.alertOK'),
        onPress: () => {
          props.navigation.pop(3);
        },
      },
      {text: i18n.t('addStatus.alertCancel'), onPress: () => {}},
    ]);
  }

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          {Platform.OS === 'ios' ? (
            <CropView
              sourceUrl={
                image.sourceURL && typeof image.sourceURL === 'string'
                  ? image.sourceURL
                  : image.path
              }
              style={viewShotStyle}
              ref={cropViewRef}
              onImageCrop={(res) => {
                const uri = res.uri;
                uploadToStorage(uri);
              }}
              keepAspectRatio
              aspectRatio={{width: 9, height: 16}}
            />
          ) : (
            <View style={cropViewAndroidStyle}>
              <ImageCropper
                imageUri={image.path}
                cropAreaWidth={cropperWidth}
                cropAreaHeight={cropperHeight}
                containerColor="#333"
                areaColor="#333"
                areaOverlay={
                  <View style={overlayStyle}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                      <View style={overlayBorder(index)} />
                    ))}
                  </View>
                }
                setCropperParams={(params) => setCropperParamsFunc(params)}
              />
            </View>
          )}
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.addStore}
              activeOpacity={1}
              onPress={() => props.navigation.navigate('AddStore')}>
              <Text style={styles.addStoreText}>
                +{' '}
                {isEmpty(storeSelected)
                  ? i18n.t('addStory.addStore')
                  : i18n.t('addStory.changeStore')}
              </Text>
            </TouchableOpacity>
            <View style={styles.addStory}>
              <ButtonRounded
                contentStyle={styles.addStoryButton}
                labelStyle={styles.addStoryButtonText}
                label={i18n.t('addStory.addStory')}
                onPress={addStory}
              />
            </View>
          </View>
          <View style={styles.backButton}>
            <TouchableOpacity
              style={styles.backButtonStyle}
              onPress={showAlert}>
              <FontAwesome
                name="chevron-left"
                color={colors['$black']}
                size={13}
              />
            </TouchableOpacity>
          </View>
          {!isEmpty(storeSelected) ? (
            <View style={styles.selectStore}>
              <CommonIcon.Store width={12} height={12} />
              <Text style={styles.selectStoreName}>{storeSelected.name}</Text>
              <TouchableOpacity
                style={styles.selectStoreRemove}
                activeOpacity={0.9}
                onPress={removeStore}>
                <Text style={styles.selectStoreRemoveText}>
                  {i18n.t('remove')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStory;
