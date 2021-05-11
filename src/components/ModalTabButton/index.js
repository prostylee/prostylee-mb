import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Button, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {commonActions, commonSelectors} from 'reducers';
import RootNavigator from 'navigator/rootNavigator';
import LinearGradient from 'react-native-linear-gradient';
import * as TabsIcon from 'svg/bottomTab';
import i18n from 'i18n';
import {launchImageLibrary} from 'react-native-image-picker';

import Modal from 'react-native-modal';

import {dim} from 'utils/common';

const WIDTH = dim.width;

const ModalTabButton = ({style, visible}) => {
  const dispatch = useDispatch();
  const closeTabButton = React.useCallback(() => {
    dispatch(commonActions.toggleTabButton(false));
    dispatch(commonActions.toggleFocusMainTab(false));
  }, [dispatch]);
  const AddStoryButton = React.useMemo(() => {
    const buttonAction = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          maxWidth: WIDTH,
        },
        (image) => {
          console.log('image', JSON.stringify(image, null, 4))
          closeTabButton();
          RootNavigator.navigate('AddStory', {image: image});
        },
      );
    };
    return (
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={styles.button}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonWrapper, {backgroundColor: '#823FFD'}]}
          onPress={buttonAction}>
          <TabsIcon.StoryButton />
        </Button>
        <Text style={styles.labelStyle}>{i18n.t('bottomTab.addStory')}</Text>
      </View>
    );
  }, [closeTabButton]);
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      transparent={true}
      isVisible={visible}
      backdropColor={'transparent'}
      onBackdropPress={() => {
        dispatch(commonActions.toggleTabButton(false));
      }}
      style={styles.modalStyle}
      animationOutTiming={20}
      backdropOpacity={0.1}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeTabButton} style={{flex: 1}}>
          <LinearGradient
            colors={['#ffffff00', '#ffffffff']}
            style={styles.linearGradient}>
            {AddStoryButton}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalTabButton;
