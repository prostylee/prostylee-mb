import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  button: {
    width: '100%',
    height: '30rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '6rem',
    marginTop: '10rem',
    paddingHorizontal: '5rem',

    // '@media ios': {
    //   shadowColor: 'black',
    //   shadowOffset: {width: 0, height: 2},
    //   shadowOpacity: 0.2,
    //   shadowRadius: 2,
    // },

    // '@media android': {
    //   borderWidth: Platform.Version < 21 ? 1 : null,
    //   borderColor: Platform.Version < 21 ? '$borderColor' : null,
    //   elevation: 2,
    // },
  },

  iconLeft: {
    width: '13rem',
    height: '13rem',
    marginRight: '5rem',
  },
  iconRight: {
    width: '13rem',
    height: '13rem',
    marginLeft: '5rem',
  },
  text: {
    color: '$lightGray',
    fontSize: '$largeText',
    fontFamily: '$font1',
  },
});

export default styles;
