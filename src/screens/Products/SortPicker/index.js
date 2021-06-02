import styles from './styles';

import React from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {ThemeView} from 'components';

const Picker = ({visible, setVisible, setAction, children}) => {
  const onOutside = () => {
    setAction(null);
    setVisible(false);
  };

  return visible ? (
    <Animated.View style={styles.container}>
      <ThemeView style={styles.content} isFullView>
        <View style={styles.wrapper}>
          <View style={styles.contentPicker}>{children}</View>
          <TouchableWithoutFeedback onPress={onOutside}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
        </View>
      </ThemeView>
    </Animated.View>
  ) : null;
};

Picker.defaultProps = {visible: false};

export default Picker;
