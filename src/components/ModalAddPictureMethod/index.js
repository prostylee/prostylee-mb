import React from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import styles from './styles';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {commonActions, commonSelectors} from 'reducers';
import IonIcons from 'react-native-vector-icons/Ionicons';
import RootNavigator from 'navigator/rootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import i18n from 'i18n';
import ImagePicker from 'react-native-image-crop-picker';

import Modal from 'react-native-modal';

import {dim} from 'utils/common';

const WIDTH = dim.width;
const HEIGHT = dim.height;

const ModalAddPictureMethod = ({visible}) => {
  const dispatch = useDispatch();
  const [initRender, setInitRender] = React.useState(false);
  const [pickerModal, setPickerModal] = React.useState('');
  const isShowAddPictureOption = useSelector((state) =>
    commonSelectors.isShowAddPictureOption(state),
  );
  const closeAddPictureOption = React.useCallback(() => {
    dispatch(commonActions.toggleAddPictureOption(false));
  }, [dispatch]);

  React.useEffect(() => {
    setTimeout(() => {
      setInitRender(true);
    }, 1000);
    if (isShowAddPictureOption) {
      closeAddPictureOption();
    }
  }, []);

  const addPictureAni = React.useRef(new Animated.Value(0)).current;
  const storyButtonXValue = addPictureAni.interpolate({
    inputRange: [0, 1],
    outputRange: [WIDTH / 3, 0],
  });
  const buttonYValue = addPictureAni.interpolate({
    inputRange: [0, 1],
    outputRange: [HEIGHT / 5, 0],
  });
  const productButtonXValue = addPictureAni.interpolate({
    inputRange: [0, 1],
    outputRange: [-WIDTH / 3, 0],
  });
  const buttonOpacitye = addPictureAni.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const addPictureOptionShow = () => {
    Animated.timing(addPictureAni, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const addPictureOptionHide = () => {
    Animated.timing(addPictureAni, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const openLibraryPicker = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then((res) => {
        console.log(res);
        RootNavigator.navigate('AddStory', {image: res});
      })
      .catch((e) => console.log(e));
  };

  const openCameraPicker = async () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: false,
    })
      .then((res) => {
        console.log(res);
        RootNavigator.navigate('AddStory', {image: res});
      })
      .catch((e) => console.log(e));
  };

  const checkPickerModal = () => {
    try {
      switch (pickerModal) {
        case 'library':
          openLibraryPicker();
          break;
        case 'camera':
          openCameraPicker();
          break;
        default:
          return;
      }
    } finally {
      setPickerModal('');
    }
  };

  const OpenLibraryButton = () => {
    const buttonAction = async () => {
      setPickerModal('library');
      closeAddPictureOption();
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
          style={[styles.buttonWrapper, {backgroundColor: '#E5E5E5'}]}
          onPress={buttonAction}>
          <IonIcons name="image" size={28} color={'#333333'} />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>
          {i18n.t('bottomTab.libraryButton')}
        </Text>
      </Animated.View>
    );
  };
  const OpenCameraButton = () => {
    const buttonAction = () => {
      setPickerModal('camera');
      closeAddPictureOption();
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
          style={[styles.buttonWrapper, {backgroundColor: '#E5E5E5'}]}
          onPress={buttonAction}>
          <IonIcons name="camera" size={28} color={'#333333'} />
        </TouchableOpacity>
        <Text style={styles.labelStyle}>
          {i18n.t('bottomTab.cameraButton')}
        </Text>
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
        addPictureOptionShow();
      }}
      onModalWillHide={() => {
        addPictureOptionHide();
      }}
      onModalHide={() => {
        setTimeout(() => {
          checkPickerModal();
        }, 200);
      }}
      backdropColor={'transparent'}
      onBackdropPress={() => {
        dispatch(commonActions.toggleAddPictureOption(false));
      }}
      style={styles.modalStyle}
      animationOutTiming={500}
      backdropOpacity={0.1}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeAddPictureOption}
          style={styles.modalBackground}>
          <LinearGradient
            colors={['#ffffff00', '#ffffffff']}
            style={styles.linearGradient}>
            <OpenLibraryButton />
            <OpenCameraButton />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalAddPictureMethod;
