import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainWrapper: {
    flex: 1,
    paddingTop: '110%',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '160rem',
    height: '42rem',
    alignSelf: 'center',
  },
  btnWrapper: {
    marginTop: '20rem',
    marginHorizontal: '10%',
  },
  loginBtn: {
    marginBottom: '15rem',
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
    backgroundColor: '$purple',
  },
  signupBtn: {
    marginBottom: '15rem',
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
    backgroundColor: '$white',
  },
  loginBtnLabel: {
    width: '100%',
    fontSize: '$largeText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$white',
    margin: 0,
  },
  signupBtnLabel: {
    width: '100%',
    fontSize: '$largeText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$purple',
    margin: 0,
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
    fontSize: '$largeText',
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
  socialBtn: {
    width: '46rem',
    height: '46rem',
  },
});
