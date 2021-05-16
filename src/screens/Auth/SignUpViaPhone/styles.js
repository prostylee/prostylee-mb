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
    flex: 1,
    paddingHorizontal: '6%',
    marginTop: '20rem',
  },
  label: {
    fontFamily: '$font1',
    color: '$lightGray',
    fontSize: '$normalText',
  },
  textInput: {
    marginBottom: '10rem',
  },
  btnWrapper: {
    marginTop: '15rem',
  },
  textBtnLabel: {
    color: '$black500',
  },
  textBtn: {
    marginTop: '-10rem',
  },
  labelBtn: {
    color: '$lightGray',
  },
  privacyWrapper: {
    paddingHorizontal: '8%',
    marginTop: '10rem',
  },
  noticeText: {
    fontSize: '$smallText',
    fontFamily: '$font1',
    color: '$lightGray',
    textAlign: 'center',
  },
  btnRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  privacyButton: {
    fontSize: '$smallText',
    fontFamily: '$font1',
    color: '$black',
    paddingHorizontal: 0,
  },
});
