import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  label: {
    fontFamily: '$font1Bold',
    color: '$black500',
    fontSize: '$largeText',
    textAlign: 'center',
    lineHeight: '28rem',
    marginTop: '15rem',
  },
  content: {
    fontFamily: '$font1',
    color: '$lightGray',
    fontSize: '$normalText',
    textAlign: 'center',
    lineHeight: '18rem',
  },
  email: {
    fontFamily: '$font1',
    color: '$black500',
    fontSize: '$normalText',
    textAlign: 'center',
    lineHeight: '18rem',
  },
  contentButton: {
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: '20rem',
    borderWidth: '1rem',
    borderColor: '$purple',
  },
});
