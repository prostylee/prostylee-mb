import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  emptyStoreText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$black',
  },
});
