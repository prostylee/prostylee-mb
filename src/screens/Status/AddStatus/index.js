import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  BackHandler,
} from 'react-native';
import { Container, ButtonRounded, HeaderBack } from 'components';
import { useTheme, useRoute, useNavigation, useIsFocused } from '@react-navigation/native';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import Carousel from 'react-native-snap-carousel';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { hasNotch } from 'react-native-device-info';
import { Storage, Auth } from 'aws-amplify';
import styles from './styles';
import i18n from 'i18n';
import { useBackHandler } from '@react-native-community/hooks';
import { commonActions, statusSelectors, statusActions } from 'reducers';
import { useDispatch, useSelector } from 'react-redux';

import { dim } from 'utils/common';
import { showMessage } from 'react-native-flash-message';

import {TYPE_USER} from '../../../constants'

const WIDTH = dim.width;

const AddStatus = (props) => {
  const isFocused = useIsFocused();
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const inputValueRef = React.useRef();
  const imagesRef = React.useRef();
  const [uploadList, setUploadList] = React.useState([]);
  const [doneUpload, setDoneUpload] = React.useState(false);
  const [userId, setUserId] = React.useState('');

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.signInUserSession.idToken.payload.sub);
      })
      .catch((_) =>
        showMessage({
          message: i18n.t('unknownMessage'),
          type: 'danger',
          position: 'top',
        }),
      );
  }, []);

  //route
  const route = useRoute();
  const images = route?.params.images || [];
  const navigation = useNavigation();

  const storeSelected = useSelector((state) =>
    statusSelectors.getStatusStore(state),
  );
  const customPrefix = `/public/${userId}/posts/`;

  const removeStore = async () => {
    await dispatch(statusActions.removeStatusStore());
  };

  React.useEffect(() => {
    if (
      doneUpload &&
      uploadList.length === images.length &&
      uploadList.every((image) => Boolean(image))
    ) {
      postStatus();
    }
  }, [doneUpload, JSON.stringify(uploadList)]);

  //BackHandler handle
  useBackHandler(() => {
    showAlert()
    return true;
  });

  //Theme
  const { colors } = useTheme();

  const renderItem = ({ item, index }) => {
    return (
      <Image
        style={styles.imageStyle}
        source={{ uri: item.uri }}
        resizeMode={'contain'}
      />
    );
  };

  const postStatus = React.useCallback(async () => {
    try {
      const imagesList = uploadList.map((item) => {
        return {
          name: item.name,
          path: customPrefix,
        };
      });
      if (!isEmpty(storeSelected)) {
        //change to newfeed of user after post a status
        dispatch(commonActions.toggleTargetType(TYPE_USER))
        await dispatch(
          statusActions.postStatus({
            description: inputValueRef.current,
            storeId: storeSelected.id,
            images: imagesList,
            targetType: 'user',
          }),
        );
        removeStore();
      } else {
        dispatch(commonActions.toggleTargetType(TYPE_USER))
        await dispatch(
          statusActions.postStatus({
            description: inputValueRef.current,
            images: imagesList,
            targetType: 'user',
          }),
        );
        removeStore();
      }
    } finally {
      dispatch(commonActions.toggleLoading(false));
    }
  }, [JSON.stringify(uploadList), inputValueRef.current, storeSelected]);

  const uploadToStorage = async (image) => {
    try {
      if (!image.uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({ level: 'public' }); // public | protected | private
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const time = Date.now();
      const fileName = `${userId}/posts/status_${time}.jpg`;
      try {
        const result = await Storage.put(fileName, blob, {
          contentType: 'image/jpeg',
        });
        if (result) {
          setUploadList((prev) => {
            let newList = prev;
            newList[image.index] = {
              name: `status_${time}.jpg`,
              index: image.index,
            };
            return newList;
          });
        }
      } catch (err) {
        dispatch(commonActions.toggleLoading(false));
        Alert.alert(i18n.t('error.cannotUploadImage'));
      }
    } catch (err) {
      dispatch(commonActions.toggleLoading(false));
      Alert.alert(i18n.t('error.cannotGetImage'));
    } finally {
      if (image.index === images.length - 1) {
        setDoneUpload(true);
      }
    }
  };

  const addStatus = () => {
    if (images.length) {
      images.forEach(async (item) => {
        await uploadToStorage(item);
      });
    }
  };

  const ImageSlideList = () => {
    const [activeImage, setActiveImage] = React.useState(1);
    return (
      <>
        <Carousel
          ref={imagesRef}
          data={images}
          activeSlideAlignment={'start'}
          renderItem={renderItem}
          sliderWidth={WIDTH * images.length}
          itemWidth={WIDTH}
          onSnapToItem={(index) => setActiveImage(index + 1)}
        />
        {images.length >= 1 ? (
          <View style={styles.imagesCount}>
            <Text
              style={
                styles.imageCountText
              }>{`${activeImage}/${images.length}`}</Text>
          </View>
        ) : null}
      </>
    );
  };

  const InputStatusText = () => {
    const [textValue, setTextValue] = React.useState(
      typeof inputValueRef.current === 'string' ? inputValueRef.current : '',
    );
    return (
      <TextInput
        ref={inputRef}
        multiline={true}
        underlineColorAndroid="transparent"
        style={styles.textInput}
        placeholder={i18n.t('addStatus.textPlaceholder')}
        onChangeText={(text) => {
          setTextValue(text);
          inputValueRef.current = text;
        }}
        value={textValue}
        blurOnSubmit={true}
        placeholderTextColor={colors['$lightGray']}
      />
    );
  };

  const containerStyle = [
    styles.container,
    { paddingTop: Platform.OS === 'android' ? notchHeight : 0 },
  ];

  // Add alert for button back to comfirm 

  function showAlert() {
    Alert.alert(
      i18n.t('addStatus.alertTitle'), i18n.t('addStatus.alert'),
      [
        { text: i18n.t('addStatus.alertOK'), onPress: () => { navigation.pop(3) } },
        { text: i18n.t('addStatus.alertCancel'), onPress: () => { } }
      ]
    )
  }

  return (
    <View style={containerStyle}>
      <HeaderBack
        onBack={showAlert}
        title={i18n.t('addStatus.title')}
      />
      <InputStatusText />
      <Container style={styles.mainContent}>
        <View style={styles.imagesList}>
          <ImageSlideList />
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
      </Container>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.addStore}
          activeOpacity={1}
          onPress={() => props.navigation.navigate('AddStoreForStatus')}>
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
            label={i18n.t('addStatus.addStatus')}
            onPress={addStatus}
          />
        </View>
      </View>
    </View>
  );
};

export default AddStatus;
