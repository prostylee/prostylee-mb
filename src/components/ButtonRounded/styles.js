import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  buttonWrapper: {
    backgroundColor: '$purple',
  },
  button: {
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
  },

  disabledButton: {
    backgroundColor: '$line',
  },

  labelStyle: {
    fontSize: '$largeText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$white',
    marginVertical: 0,
    fontWeight: '500',
  },
});

export default styles;
