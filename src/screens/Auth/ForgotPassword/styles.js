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
  label: {
    fontFamily: '$font1',
    color: '$lightGray',
    fontSize: '$normalText',
  },
  button: {
    marginTop: '15rem',
  },
  errMsg: {
    fontFamily: '$font1',
    fontSize: '$smallText',
    color: '$red',
    marginTop: '4rem',
  },
});