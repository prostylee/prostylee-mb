import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelStyle: {
    fontSize: '$mediumText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$purple',
  },
  disabledText: {
    color: '$lightGray',
  },
});

export default styles;
