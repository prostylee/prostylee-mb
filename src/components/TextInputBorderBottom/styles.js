import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    fontFamily: '$font1',
    fontSize: '$normalText',
    padding: 0,
    borderColor: '$borderColor',
    borderBottomWidth: 1,
    color: '$gray',
    height: '46rem',
    paddingRight: '11%',
    zIndex: 1,
  },
  wrapperIcon: {
    position: 'absolute',
    bottom: '0%',
    right: '0%',
    width: '35rem',
    height: '46rem',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  icon: {
    width: '16rem',
    height: '16rem',
  },
  unitText: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    fontFamily: '$font1',
    fontSize: '$normalText',
    color: '$label',
  },
});

export default styles;
