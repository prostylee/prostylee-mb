import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
    height: 110,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: '100%',
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
  activeItem: {
    backgroundColor: '$purpleActive',
    borderBottomColor: '$purple',
    borderBottomWidth: 3,
  },
  wrapItems: {
    paddingTop: 16,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    padding: 8,
  },
  viewLoadingFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
});
