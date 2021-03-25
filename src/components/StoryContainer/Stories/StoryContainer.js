/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import ProgressView from './ProgressView';
import StoryView from './StoryView';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import {TINT_GRAY} from '../Utils/colors';
import ArrowNavigator from './ArrowNavigator';
import {DEFAULT_DURATION} from '../Utils/constant';

const WIDTH = Dimensions.get('window').width;
const StoryContainer = (props) => {
  const [progressIndex, setProgressIndex] = useState(0);
  const [stopProgress, setStopProgress] = useState(false);

  useEffect(() => {
    setProgressIndex(progressIndex);
  }, [progressIndex, props.enableProgress]);

  useEffect(() => {
    let showKeyBoardListener = Keyboard.addListener(
      'keyboardDidShow',
      onShowKeyboard,
    );
    let hideKeyBoardListener = Keyboard.addListener(
      'keyboardDidHide',
      onHideKeyboard,
    );

    return () => {
      showKeyBoardListener.remove();
      hideKeyBoardListener.remove();
    };
  }, [onHideKeyboard, onShowKeyboard]);

  function onShowKeyboard() {
    setStopProgress(true);
  }

  function onHideKeyboard() {
    setStopProgress(false);
  }

  function onArrorClick(type) {
    switch (type) {
      case 'left':
        onChange(progressIndex === 0 ? progressIndex : progressIndex - 1);
        break;

      case 'right':
        const size = props.imageStyle ? props.images.length - 1 : 0;
        onChange(progressIndex === size ? progressIndex : progressIndex + 1);
        break;
    }
  }

  function onChange(position) {
    if (props.enableProgress ? props.enableProgress : true && !stopProgress) {
      if (position < props.images.length) {
        setProgressIndex(position);
      } else {
        props.onComplete();
      }
    }
  }

  return (
    <SafeAreaView>
      {Platform.OS === 'ios' && (
        <KeyboardAvoidingView behavior="padding">
          <View>{props.visible ? getView() : <View />}</View>
        </KeyboardAvoidingView>
      )}

      {Platform.OS === 'android' && (
        <View>{props.visible ? getView() : <View />}</View>
      )}
    </SafeAreaView>
  );

  function getView() {
    return (
      <View
        style={props.containerStyle ? props.containerStyle : styles.parentView}>
        <StoryView
          images={props.images}
          duration={props.duration ? props.duration : DEFAULT_DURATION}
          progressIndex={progressIndex}
          imageStyle={props.imageStyle}
        />

        <View style={styles.customView}>
          <ArrowNavigator onArrowClick={(type) => onArrorClick(type)} />
        </View>

        <View style={styles.progressView}>
          <ProgressView
            enableProgress={
              props.enableProgress
                ? props.enableProgress
                : true && !stopProgress
            }
            images={props.images}
            duration={props.duration ? props.duration : DEFAULT_DURATION}
            barStyle={props.barStyle}
            progressIndex={progressIndex}
            onChange={(position) => onChange(position)}
          />
        </View>
      </View>
    );
  }
};

export default StoryContainer;

StoryContainer.propTypes = {
  enableProgress: PropTypes.bool,
};

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: TINT_GRAY,
    marginTop: Platform.OS === 'ios' ? -40 : 0,
  },
  customView: {
    position: 'absolute',
    flexDirection: 'column',
    width: WIDTH,
    height: '100%',
  },
  topView: {
    position: 'absolute',
    flexDirection: 'column',
    width: WIDTH,
    paddingTop: '3%',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'baseline',
    textAlignVertical: 'bottom',
    paddingTop: '3%',
    paddingBottom: '2%',
  },
  progressView: {
    flex: 1,
    width: WIDTH,
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: TINT_GRAY,
  },
});
