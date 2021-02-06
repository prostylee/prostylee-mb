import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainWrapper: {
    flex: 1,
    paddingTop: '115%',
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
    marginTop: '25rem',
    marginHorizontal: '10%',
  },
  btnContainer: {
    marginVertical: '10rem',
  },
  signupBtn: {
    backgroundColor: '$white',
  },
  signupBtnLabel: {
    color: '$purple',
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
  socialBtn: {
    width: '46rem',
    height: '46rem',
  },
});
