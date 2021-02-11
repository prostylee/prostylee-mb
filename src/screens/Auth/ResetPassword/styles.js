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
  },
  form: {
    paddingHorizontal: '6%',
    marginTop: '20rem',
  },
  button: {
    marginTop: '15rem',
  },
  textInput: {
    paddingRight: '5%',
  },
  errMsg: {
    fontFamily: '$font1',
    fontSize: '$smallText',
    color: '$red',
    marginTop: '4rem',
  },
});
