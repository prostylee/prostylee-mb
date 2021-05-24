import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerAlert: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalAlert: {
    marginTop: '-30%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: '3rem',
    width: '80%',
    padding: '10rem',

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
  buttonOK: {
    fontFamily: '$font1',
    fontWeight: 'bold',
    color: '$gray',
    fontSize: '$normalText',
  },
  icon: {
    width: '22rem',
    height: '22rem',
    alignSelf: 'center',
    marginVertical: '5rem',
  },
  wrapperBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10rem',
  },
  wrapperTextBtnConfirm: {
    padding: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10rem',
  },
});

export default styles;
