import styles from './styles';

import React from 'react';
import {View, TouchableWithoutFeedback, Animated, Platform} from 'react-native';
import ThemeView from '../ThemeView';

const Picker = ({visible, setVisible, setAction, children}) => {
  const onOutside = () => {
    setAction(null);
    setVisible(false);
  };

  return visible ? (
    <Animated.View
      style={[styles.container, Platform.OS === 'ios' ? {zIndex: 1} : null]}>
      <ThemeView style={styles.content} isFullView>
        <View style={styles.wrapper}>
          <View style={styles.contentPicker}>{children}</View>
          <TouchableWithoutFeedback onPress={onOutside}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
        </View>
      </ThemeView>
    </Animated.View>
  ) : null;
};

Picker.defaultProps = {visible: false, setAction: () => {}};

export default Picker;
