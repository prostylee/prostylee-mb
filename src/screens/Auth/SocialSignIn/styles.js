import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
});
