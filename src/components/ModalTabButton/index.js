import React from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {commonActions, commonSelectors} from 'reducers';
import RootNavigator from 'navigator/rootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import * as TabsIcon from 'svg/bottomTab';
import i18n from 'i18n';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import Modal from 'react-native-modal';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const ModalTabButton = ({style, visible}) => {
  const dispatch = useDispatch();
  const [initRender, setInitRender] = React.useState(false);
  const [pickerModal, setPickerModal] = React.useState('');
  const isShowTabButton = useSelector((state) =>
    commonSelectors.isShowTabButton(state),
  );
  const closeTabButton = React.useCallback(() => {
    dispatch(commonActions.toggleTabButton(false));
    dispatch(commonActions.toggleFocusMainTab(false));
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      setInitRender(true);
    }, 1000);
    if (isShowTabButton) {
      closeTabButton();
    }
  }, []);

  const tabButtonAni = React.useRef(new Animated.Value(0)).current;
  const storyButtonXValue = tabButtonAni.interpolate({
    inputRange: [0, 1],
    outputRange: [WIDTH / 3, 0],
  });
  const buttonYValue = tabButtonAni.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT / 5, 0],
  });
  const productButtonXValue = tabButtonAni.interpolate({
    inputRange: [0, 1],
    outputRange: [-WIDTH / 3, 0],
  });
  const buttonOpacitye = tabButtonAni.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const tabButtonShow = () => {
    Animated.timing(tabButtonAni, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const tabButtonHide = () => {
    Animated.timing(tabButtonAni, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const openStoryPicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then((res) => {
        console.log(res);
        RootNavigator.navigate('AddStory', {image: res});
      })
      .catch((e) => console.log(e));
  };

  const openStatusPicker = async () => {
    MultipleImagePicker.openPicker({
      mediaType: 'image',
      maxSelectedAssets: 4,
      selectedColor: '#3470FB',
      selectedAssets: [],
    })
      .then((res) => {
        console.log(res);
        RootNavigator.navigate('CropPicture', {images: res});
      })
      .catch((e) => console.log(e));
  };

  const checkPickerModal = () => {
    switch (pickerModal) {
      case 'story':
        openStoryPicker();
        break;
      case 'status':
        openStatusPicker();
        break;
      case 'product':
        break;
      default:
        return;
    }
  };

  const AddStoryButton = () => {
    const buttonAction = async () => {
      setPickerModal('story');
      closeTabButton();
    };
    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              {translateX: storyButtonXValue},
              {translateY: buttonYValue},
            ],
            opacity: buttonOpacitye,
          },
        ]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonWrapper, {backgroundColor: '#823FFD'}]}
          onPress={buttonAction}>
          <TabsIcon.StoryButton />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>{i18n.t('bottomTab.addStory')}</Text>
      </Animated.View>
    );
  };
  const AddPostButton = () => {
    const buttonAction = () => {
      setPickerModal('status');
      closeTabButton();
    };
    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{translateY: buttonYValue}],
            opacity: buttonOpacitye,
          },
        ]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonWrapper, {backgroundColor: '#EA3F49'}]}
          onPress={buttonAction}>
          <TabsIcon.PostButton />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>{i18n.t('bottomTab.addPost')}</Text>
      </Animated.View>
    );
  };
  const AddProductButton = () => {
    const buttonAction = () => {
      // launchImageLibrary(
      //   {
      //     mediaType: 'photo',
      //     maxWidth: WIDTH,
      //   },
      //   (image) => {
      closeTabButton();
      //     RootNavigator.navigate('AddStory', {image: image});
      //   },
      // );
    };
    return (
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              {translateY: buttonYValue},
              {translateX: productButtonXValue},
            ],
            opacity: buttonOpacitye,
          },
        ]}>
        <TouchableOpacity
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonWrapper, {backgroundColor: '#F46F2F'}]}
          onPress={buttonAction}>
          <TabsIcon.ProductButton />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>{i18n.t('bottomTab.addProduct')}</Text>
      </Animated.View>
    );
  };
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={initRender ? visible : false}
      onModalWillShow={() => {
        tabButtonShow();
      }}
      onModalWillHide={() => {
        tabButtonHide();
      }}
      onModalHide={() => {
        setTimeout(() => {
          checkPickerModal();
        }, 200);
      }}
      backdropColor={'transparent'}
      onBackdropPress={() => {
        dispatch(commonActions.toggleTabButton(false));
      }}
      style={styles.modalStyle}
      animationOutTiming={500}
      backdropOpacity={0.1}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeTabButton}
          style={styles.modalBackground}>
          <LinearGradient
            colors={['#ffffff00', '#ffffffff']}
            style={styles.linearGradient}>
            <AddStoryButton />
            <AddPostButton />
            <AddProductButton />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalTabButton;
