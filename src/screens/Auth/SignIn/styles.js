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
  logoWrapper: {
    marginTop: '20rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '$white',
    height: '50rem',
  },
  indicatorStyle: {
    backgroundColor: '$black',
  },
  labelWrapper: {
    height: '40rem',
    width: '$screenWidth/2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLabel: {
    color: '$black',
    fontSize: '14rem',
    fontFamily: '$font1',
  },
  inactiveLabel: {
    color: '$lightGray',
    fontSize: '14rem',
    fontFamily: '$font1',
  },
  tabViewWrapper: {
    flex: 1,
    backgroundColor: '$white',
  },
  form: {
    paddingHorizontal: '8%',
    marginTop: '15rem',
  },
  textInput: {
    height: '46rem',
    marginTop: '10rem',
    paddingRight: '5%',
  },
  btnWrapper: {
    marginTop: '20rem',
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
  socialSignIn: {
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
