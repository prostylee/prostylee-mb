import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    padding: 8,
  },
  itemActive: {
    backgroundColor: '$purpleActive',
    borderLeftColor: '$purple',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  title: {
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '$black',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
