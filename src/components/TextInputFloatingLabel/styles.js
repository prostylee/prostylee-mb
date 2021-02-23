import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyles: {
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: '$borderColor',
    marginTop: '10rem',
    height: '45rem',
  },
  containerStylesFocus: {
    borderWidth: 0,
    padding: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: '$purple',
    marginTop: '10rem',
    height: '45rem',
  },
  textInput: {
    fontFamily: '$font1',
    fontSize: '$normalText',
    padding: 0,
    color: '$gray',
    paddingRight: '11%',
    zIndex: 1,
    marginTop: '5rem',
  },
  labelStyles: {
    width: '100%',
    padding: 0,
    margin: 0,
    marginLeft: '-1.5%',
    color: '$lightGray',
    fontSize: '$normalText',
    fontFamily: '$font1',
  },
  wrapperIcon: {
    width: '35rem',
    height: '35rem',
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 1,
  },
  icon: {
    width: '16rem',
    height: '16rem',
  },
  unitText: {
    fontFamily: '$font1',
    fontSize: '$normalText',
    color: '$label',
  },
});

export default styles;
