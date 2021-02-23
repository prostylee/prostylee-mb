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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10rem',
  },
  line: {
    height: '1rem',
    width: '40rem',
    backgroundColor: '$line',
  },
  labelDivider: {
    fontSize: '$mediumText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$lightGray',
    marginHorizontal: '5rem',
  },
  socialLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '15rem',
  },
  socialBtnWrapper: {
    width: '46rem',
    height: '46rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '8rem',
  },
  btnBordered: {
    borderWidth: 0.5,
    borderColor: '$borderColor',
    borderRadius: '23rem',
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
