import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '$bgColor',
  },
  imageWrapper: {
    height: '60%',
    backgroundColor: '$bgColor',
    paddingBottom: 0,
    marginTop: '-20%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
