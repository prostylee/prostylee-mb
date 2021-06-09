import React from 'react';
import {Keyboard} from 'react-native';

const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        console.log('SHOW KEYBOARD');
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        console.log('HIDE KEYBOARD');
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return isKeyboardVisible;
};
export default useKeyboardVisible;
