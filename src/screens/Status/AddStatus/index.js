import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {
  ContainerWithoutScrollView,
  ButtonRounded,
  HeaderBack,
} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute, useNavigation} from '@react-navigation/native';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import Carousel from 'react-native-snap-carousel';
import {Storage} from 'aws-amplify';
import {userTokenSelector} from 'redux/selectors/user';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, statusSelectors, statusActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const storyImageRatio = 5 / 4;

const AddStatus = (props) => {
  const dispatch = useDispatch();
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const inputRef = React.useRef();
  const imagesRef = React.useRef();
  const [textValue, setTextValue] = React.useState('');
  const [uploadList, setUploadList] = React.useState([]);
  const [doneUpload, setDoneUpload] = React.useState(false);

  //route
  const route = useRoute();
  const images = route?.params.images || [];
  const navigation = useNavigation();

  const storeSelected = useSelector((state) =>
    statusSelectors.getStatusStore(state),
  );
  const customPrefix = '/public/userId/posts/';
  const userProfile = useSelector((state) => userTokenSelector(state));
  const userData = userProfile
    ? userProfile.signInUserSession?.idToken.payload.identities?.[0]
    : {};

  const removeStore = async () => {
    await dispatch(statusActions.removeStatusStore());
  };

  React.useEffect(() => {
    if (doneUpload) {
      postStatus();
    }
  }, [doneUpload]);

  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  const renderItem = ({item}) => {
    return (
      <Image
        style={styles.imageStyle}
        source={{uri: item.uri}}
        resizeMode={'contain'}
      />
    );
  };

  const postStatus = async (name) => {
    const imagesList = uploadList.map((item) => {
      return {
        name: item.name,
        path: customPrefix,
      };
    });
    if (!isEmpty(storeSelected) && storeSelected.id) {
      await dispatch(
        statusActions.postStatus({
          images: imagesList,
          targetType: 'user',
          targetId: userData.userId,
        }),
      );
    } else {
      await dispatch(
        statusActions.postStatus({
          storeId: storeSelected.id,
          images: imagesList,
          targetType: 'user',
          targetId: userData.userId,
        }),
      );
    }
    removeStore();
  };

  const uploadToStorage = async (image) => {
    console.log('uploadToStorage ');
    try {
      if (!image.uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({level: 'protected'}); // public | protected | private
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const fileName = `status_${Date.now()}.jpg`;
      try {
        const result = await Storage.put(fileName, blob, {
          contentType: 'image/jpeg',
          customPrefix: customPrefix,
        });
        if (result) {
          console.log('Uploaded with result = ' + JSON.stringify(result));
          setUploadList((prev) => {
            let newList = prev;
            newList[image.index] = {
              name: result.key,
              uri: image.uri,
              index: image.index,
            };
            return newList;
          });
          getUrl(result.key);
        }
      } catch (err) {
        console.log(err);
      }
      console.log('Upload successfully');
    } catch (err) {
      console.log(err);
    } finally {
      if (image.index === images.length - 1) setDoneUpload(true);
      dispatch(commonActions.toggleLoading(false));
    }
  };

  const getUrl = async (key) => {
    const signedURL = await Storage.get(key);
    // setUploadedPhoto(signedURL);
    console.log('signedURL ' + signedURL);
  };

  const addStatus = () => {
    if (images.length) {
      images.forEach(async (item) => {
        await uploadToStorage(item);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <HeaderBack
            onBack={navigation.goBack}
            title={i18n.t('addStatus.title')}
          />
          <TextInput
            ref={inputRef}
            multiline={true}
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder={i18n.t('addStatus.textPlaceholder')}
            onChangeText={(text) => setTextValue(text)}
            autoCapitalize={true}
            value={textValue}
            blurOnSubmit={true}
            onSubmitEditing={addStatus}
            placeholderTextColor={colors['$lightGray']}
          />
          <View style={{position: 'relative'}}>
            <Carousel
              ref={imagesRef}
              data={images}
              renderItem={renderItem}
              sliderWidth={WIDTH * images.length}
              itemWidth={WIDTH}
            />
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
                style={styles.addStoryButton}
                contentStyle={styles.addStoryButton}
                labelStyle={styles.addStoryButtonText}
                label={i18n.t('addStatus.addStatus')}
                onPress={addStatus}
              />
            </View>
          </View>
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStatus;
