import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerAlert: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalAlert: {
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: '20rem',
    position: 'relative',
    alignSelf: 'flex-end',
  },

  body: {
    backgroundColor: '#fefefe',
    width: '110%',
    marginLeft: '-5%',
    paddingHorizontal: '0rem',
    borderRadius: '6rem',
  },

  title: {
    fontFamily: '$font1',
    fontSize: '$smallText',
    paddingVertical: '8rem',
    color: '$label',
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: '$borderColor',
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5rem',
    paddingVertical: '12rem',
    position: 'relative',
    borderTopWidth: 0.5,
    borderColor: '$borderColor',
  },
  label: {
    fontFamily: '$font1',
    fontSize: '$largeText',
    color: '$primaryBlue',
  },

  btnText: {
    fontFamily: '$font1',
    color: '$red',
    fontSize: '$largeText',
  },
  footer: {
    marginTop: '5rem',
    borderRadius: '6rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '110%',
    marginLeft: '-5%',
    backgroundColor: '#fefefe',
  },
  btn: {
    width: '100%',
    paddingVertical: '12rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
