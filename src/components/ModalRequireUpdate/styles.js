import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerAlert: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAlert: {
    backgroundColor: 'white',
    borderRadius: '3rem',
    width: '80%',
    padding: '15rem',

    '@media ios': {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    '@media android': {
      elevation: 5,
    },
  },
  textTitle: {
    fontFamily: '$font1',
    fontSize: '$largeText',
    marginBottom: '10rem',
    color: '$black',
    textAlign: 'center',
  },
  message: {
    fontFamily: '$font1',
    fontSize: '$normalText',
    color: '$gray',
    marginBottom: '10rem',
    lineHeight: '18rem',
    textAlign: 'center',
  },
  titleStyle: {
    fontFamily: '$font1',
    fontSize: '$largeText',
    color: '$white',
    textAlign: 'center',
  },
  customBtn: {
    width: '60%',
    alignSelf: 'center',
    borderRadius: '15rem',
    backgroundColor: '$green',
    borderWidth: 0,
  },
});

export default styles;
