import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: '5rem',
  },
  center: {
    fontSize: '$normalText',
    color: '$gray',
    textAlign: 'center',
    fontFamily: '$font1',
  },
  copyright: {
    textAlign: 'center',
    fontSize: '$normalText',
    color: '$gray',
    marginRight: '15rem',
    fontFamily: '$font1',
  },
});
