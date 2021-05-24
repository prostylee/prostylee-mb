import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginTop: '10rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
  },
  textInput: {
    borderRadius: '6rem',
    borderColor: '#ccc',
    borderWidth: 1,
    flex: 1,
    padding: 0,
    paddingLeft: '6rem',
    fontFamily: '$font1',
    fontSize: '$mediumText',
    color: '$gray',
    height: '35rem',
  },
  wrapperIcon: {
    position: 'absolute',
    top: '28%',
    right: '8%',
    width: '18rem',
    height: '18rem',
  },
  icon: {
    width: '18rem',
    height: '18rem',
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
