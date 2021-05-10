import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Image, ContainerWithoutScrollView, ButtonRounded} from 'components';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';
import {useTheme, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import i18n from 'i18n';
import {useBackHandler} from '@react-native-community/hooks';
import {commonActions} from 'reducers';
import {useDispatch} from 'react-redux';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const AddStory = (props) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const notchHeight = getStatusBarHeight() + (hasNotch() ? 34 : 0);

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

  //dispatch
  const dispatch = useDispatch();

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
          <Image
            source={{uri: image.path}}
            style={imageStyle}
            resizeMode={'contain'}
          />
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.addStore}
              activeOpacity={1}
              onPress={() => props.navigation.navigate('AddStore')}>
              <Text style={styles.addStoreText}>
                + {i18n.t('addStory.addStore')}
              </Text>
            </TouchableOpacity>
            <View style={styles.addStory}>
              <ButtonRounded
                style={styles.addStoryButton}
                contentStyle={styles.addStoryButton}
                labelStyle={styles.addStoryButtonText}
                label={i18n.t('addStory.addStory')}
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
        </View>
      </ContainerWithoutScrollView>
    </View>
  );
};

export default AddStory;
