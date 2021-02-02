import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: '14rem',
    height: '14rem',
    borderWidth: 1,
    borderColor: '$lightGray',
    borderRadius: '7rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5rem',
    marginTop: '2rem',
  },
  dot: {
    width: '6rem',
    height: '6rem',
    borderRadius: '3rem',
    backgroundColor: '$green',
  },
  text: {
    fontSize: '$normalText',
    color: '$lightGray',
    fontFamily: '$font1',
    fontWeight: 'bold',
  },
});
