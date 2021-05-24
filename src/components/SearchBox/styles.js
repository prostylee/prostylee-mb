import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  textInput: {
    fontFamily: '$font1',
    height: '28rem',
    fontSize: '$normalText',
    color: '$gray',
    padding: 0,
    paddingLeft: '30rem',
    borderColor: '$lightGray',
    borderWidth: 1,
    borderRadius: '4rem',
  },
  ic_search: {
    position: 'absolute',
    left: '10rem',
    top: '34%',
    width: '12rem',
    height: '12rem',
    '@media ios': {
      tintColor: '$lightGray',
    },
  },
});
