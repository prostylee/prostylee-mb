import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Image,
} from 'react-native';
import {ContainerWithoutScrollView, ButtonRounded} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as CommonIcon from 'svg/common';
import isEmpty from 'lodash/isEmpty';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {Storage, Auth} from 'aws-amplify';
import {userTokenSelector} from 'redux/selectors/user';
import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;
const storyImageRatio = 16 / 9;

const AddStory = (props) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = React.useState('');
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const viewShotRef = React.useRef();

  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUserId(user.signInUserSession.idToken.payload.sub);
      })
      .catch((err) => console.log(err));
  }, []);

  //route
  const route = useRoute();
  const image = route?.params.image || '';

  const imageRatio = image.height / image.width;
  const screenRatio = (HEIGHT + notchHeight) / WIDTH;
  let imageStyle;
  imageStyle =
    imageRatio >= screenRatio
      ? {width: WIDTH, height: WIDTH * imageRatio}
      : {
          width: (HEIGHT - notchHeight) / imageRatio,
          height: HEIGHT - notchHeight,
        };
  const storeSelected = useSelector((state) =>
    newFeedSelectors.getNewFeedStore(state),
  );
  const userProfile = useSelector((state) => userTokenSelector(state));
  const userData = userProfile
    ? userProfile.signInUserSession?.idToken.payload.identities?.[0]
    : {};
  const customPrefix = `/public/${userId}/stories/`;
  const pan = React.useRef(new Animated.ValueXY()).current;

  let panXValue;
  panXValue =
    imageRatio < screenRatio
      ? pan.x.interpolate({
          inputRange: [-((HEIGHT - notchHeight) / imageRatio - WIDTH), 0],
          outputRange: [-((HEIGHT - notchHeight) / imageRatio - WIDTH), 0],
          extrapolate: 'clamp',
        })
      : 0;

  let panYValue;
  panYValue =
    imageRatio >= screenRatio
      ? pan.y.interpolate({
          inputRange: [-(WIDTH * imageRatio - (HEIGHT - notchHeight)), 0],
          outputRange: [-(WIDTH * imageRatio - (HEIGHT - notchHeight)), 0],
          extrapolate: 'clamp',
        })
      : 0;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const removeStore = async () => {
    await dispatch(newFeedActions.removeNewFeedStore());
  };

  const postStory = async (data) => {
    if (!isEmpty(storeSelected) && storeSelected.id) {
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
    } else {
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
    }
    removeStore();
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
          console.log('Uploaded with result = ' + JSON.stringify(result));
          postStory({name: `story_${time}.jpg`});
          getUrl(result.key);
        })
        .catch((err) => console.log(err));

      console.log('Upload successfully');
      dispatch(commonActions.toggleLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = async (key) => {
    const signedURL = await Storage.get(key);
    // setUploadedPhoto(signedURL);
    console.log('signedURL ' + signedURL);
  };

  const addStory = () => {
    captureRef(viewShotRef, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      (uri) => uploadToStorage(uri),
      (error) => console.error('Oops, snapshot failed', error),
    );
  };
  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  const ViewShotStyle =
    (HEIGHT - notchHeight) / WIDTH > storyImageRatio
      ? {width: WIDTH, height: WIDTH * storyImageRatio, overflow: 'visible'}
      : {
          width: (HEIGHT - notchHeight) / storyImageRatio,
          height: HEIGHT - notchHeight,
          overflow: 'visible',
        };

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <ViewShot
            style={ViewShotStyle}
            ref={viewShotRef}
            options={{format: 'jpg', quality: 0.9}}>
            <Animated.Image
              source={{uri: image.path}}
              style={[
                imageStyle,
                {
                  transform: [
                    {translateX: imageRatio < screenRatio ? panXValue : 0},
                    {translateY: imageRatio >= screenRatio ? panYValue : 0},
                  ],
                },
              ]}
              resizeMode={'contain'}
              {...panResponder.panHandlers}
            />
          </ViewShot>
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
                style={styles.addStoryButton}
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
              onPress={props.navigation.goBack}>
              <FontAwesome
                name="chevron-circle-left"
                color="#FFFFFF"
                size={28}
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
