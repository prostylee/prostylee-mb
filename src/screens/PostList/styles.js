import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  header: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  headerMiddle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  name: {
    fontFamily: '$font1',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
  },
  nameLabel: {
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
