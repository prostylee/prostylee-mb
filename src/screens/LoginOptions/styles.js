import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100rem',
    height: '100rem',
    alignSelf: 'center',
  },
  body: {
    marginVertical: '10%',
    paddingHorizontal: '5%',
  },
  btn: {
    height: '35rem',
    backgroundColor: '$white',
  },
  btnText: {
    fontSize: '$mediumText',
    color: '$mainColor',
  },
  iconBtn: {
    width: '18rem',
    height: '18rem',
    '@media ios': {
      tintColor: '$mainColor',
    },
  },
});
