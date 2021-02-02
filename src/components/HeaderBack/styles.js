import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  header: {
    paddingRight: '5rem',
    flexDirection: 'row',
    backgroundColor: '$green',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5rem',
    paddingVertical: '15rem',
  },
  wrapperIconBack: {
    width: '50rem',
    height: '30rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10rem',
  },
  iconBack: {
    width: '22rem',
    height: '22rem',
    '@media ios': {
      tintColor: '$white',
    },
  },
  headerTitle: {
    marginLeft: '2rem',
    marginTop: '-4rem',
    fontSize: '$maxText',
    color: '$white',
    fontFamily: '$font1',
  },
});
