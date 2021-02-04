import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
  },
  mainWrapper: {
    flex: 1,
  },
  pageWrapper: {
    flex: 1,
  },
  imgWrapper: {
    flex: 1.5,
    backgroundColor: '$bgColor',
    paddingBottom: 0,
    paddingHorizontal: '10%',
    paddingTop: '10%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    backgroundColor: '$white',
    marginTop: '-10%',
    paddingHorizontal: '5%',
  },
  contentWrapper: {
    flex: 1.5,
  },
  title: {
    fontSize: '$maxText2',
    fontFamily: '$font1Bold',
    marginVertical: '10rem',
    textAlign: 'center',
    color: '$black',
    lineHeight: '30rem',
  },
  content: {
    fontSize: '$largeText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$lightGray',
    lineHeight: '18rem',
  },
  btnWrapper: {
    flex: 1,
  },
  btn: {
    height: '40rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$purple',
    marginHorizontal: '3%',
  },
  btnLabel: {
    fontSize: '$largeText',
    fontFamily: '$font1',
    textAlign: 'center',
    color: '$white',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '15rem',
  },
  dot: {
    width: '6rem',
    height: '6rem',
    borderRadius: '6rem',
    marginHorizontal: '4rem',
  },
});
