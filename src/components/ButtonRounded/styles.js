import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  button: {
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
    backgroundColor: '$purple',
  },

  disabledButton: {
    backgroundColor: '$line',
  },

  labelStyle: {
    fontSize: '$mediumText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$white',
  },
});

export default styles;
