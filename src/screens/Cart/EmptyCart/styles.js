import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  viewSubTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 8,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    color: '#333333',
  },
  subTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#8B9399',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
});
