import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  leftLoading: {
    marginTop: 5,
    width: 90,
    height: 90,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 4,
    backgroundColor: '$white',
    borderLeftColor: '$white',
    height: 88,
  },
  itemActive: {
    backgroundColor: '$purpleActive',
    borderLeftColor: '$purple',
  },
  title: {
    marginTop: 8,
    lineHeight: 11,
    fontSize: 9,
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: '$black',
  },
  imageThumbnailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '$borderColor',
  },
  imageThumbnail: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  viewFooter: {
    marginBottom: 6,
  },
});
