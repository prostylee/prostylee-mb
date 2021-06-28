import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonWrapper: {
    borderColor: '$purple',
  },
  button: {
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
  },

  disabledButton: {
    backgroundColor: '#E0E0E0',
    borderWidth: 0,
  },

  labelStyle: {
    fontSize: '$mediumText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$purple',
  },
  disabledLabel: {
    color: '$white',
  },
});

export default styles;
