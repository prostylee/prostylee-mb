import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerAlert: {
    flex: 1,
  },
  ic_close: {
    width: '16rem',
    height: '16rem',
    margin: '2%',
    '@media ios': {
      tintColor: '$white',
    },
  },
  imgWrapper: {
    flex: 3,
  },
  image: {
    width: '$screenWidth',
    height: '100%',
    alignSelf: 'center',
  },
  emptyView: {
    flex: 1,
  },
});

export default styles;
