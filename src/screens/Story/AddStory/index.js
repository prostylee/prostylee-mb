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
import ViewShot from 'react-native-view-shot';
import {Storage} from 'aws-amplify';

import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions, newFeedSelectors, newFeedActions} from 'reducers';
import {useDispatch, useSelector} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const AddStory = (props) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);
  const viewShotRef = React.useRef();
  //route
  const route = useRoute();
  const image = route?.params.image || '';

  const imageRatio = image.height / image.width;
  const screenRatio = (HEIGHT - 76 + notchHeight) / WIDTH;
  const imageStyle =
    imageRatio >= screenRatio
      ? {width: WIDTH, height: WIDTH * imageRatio}
      : {
          width: (HEIGHT - (76 + notchHeight)) / imageRatio,
          height: HEIGHT - (76 + notchHeight),
        };
  const storeSelected = useSelector((state) =>
    newFeedSelectors.getNewFeedStore(state),
  );
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panXValue = pan.x.interpolate({
    inputRange: [-(WIDTH / imageRatio), 0],
    outputRange: [-(WIDTH / imageRatio), 0],
    extrapolate: 'clamp',
  });

  const panYValue = pan.y.interpolate({
    inputRange: [-(HEIGHT - (76 + notchHeight)) / imageRatio, 0],
    outputRange: [-(HEIGHT - (76 + notchHeight)) / imageRatio, 0],
    extrapolate: 'clamp',
  });

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

  const postStory = async (name) => {
    if (!isEmpty(storeSelected) && storeSelected.id) {
      await dispatch(
        newFeedActions.postStory({
          storeId: storeSelected.id,
          productImageRequests: [
            {
              name: name,
              path: 'cloundfront/prostylee/',
            },
          ],
          targetType: 'USER',
        }),
      );
    } else {
      await dispatch(
        newFeedActions.postStory({
          productImageRequests: [
            {
              name: name,
              path: 'cloundfront/prostylee/',
            },
          ],
          targetType: 'USER',
        }),
      );
    }
  };

  const uploadToStorage = async (uri) => {
    console.log('uploadToStorage ');
    try {
      if (!uri) {
        return;
      }
      dispatch(commonActions.toggleLoading(true));
      Storage.configure({level: 'protected'}); // public | protected | private
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = `story_${Date.now()}.jpg`;
      Storage.put(fileName, blob, {
        contentType: 'image/jpg',
      })
        .then((result) => {
          console.log('Uploaded with result = ' + JSON.stringify(result));
          postStory(result.key);
        })
        .catch((err) => console.log(err));

      console.log('Upload successfully');
      dispatch(commonActions.toggleLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  const addStory = () => {
    viewShotRef.current.capture().then(async (uri) => {
      uploadToStorage(uri);
    });
  };
  //BackHandler handle
  useBackHandler(() => {
    return true;
  });

  //Theme
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <ContainerWithoutScrollView
        safeAreaTopStyle={styles.safeAreaTopStyle}
        bgStatusBar={colors['$bgColor']}>
        <View style={styles.mainWrapper}>
          <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
            <Animated.Image
              source={{uri: image.uri}}
              style={[
                imageStyle,
                {
                  transform: [
                    {
                      translateX: imageRatio < screenRatio ? panXValue : 0,
                    },
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
