import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonWrapper: {
    borderColor: '$purple',
    borderWidth: 1,
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
    marginVertical: 0,
  },
  disabledLabel: {
    color: '$white',
  },
});

export default styles;
