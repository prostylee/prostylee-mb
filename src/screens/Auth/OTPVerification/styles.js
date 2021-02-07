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
  form: {
    paddingHorizontal: '6%',
    marginTop: '20rem',
  },
  label: {
    fontFamily: '$font1',
    color: '$lightGray',
    fontSize: '$normalText',
    lineHeight: '20rem',
    textAlign: 'center',
  },
  phone: {
    fontFamily: '$font1Bold',
    color: '$black500',
    fontSize: '$normalText',
    marginBottom: '20rem',
    textAlign: 'center',
  },
  button: {
    marginTop: '30rem',
    marginBottom: '20rem',
  },
  cellStyle: {
    borderBottomWidth: 1,
    borderColor: '$lightGray',
  },
  cellStyleFocused: {
    borderColor: '$black',
  },
  textStyle: {
    fontFamily: '$font1',
    color: '$black500',
    fontSize: '$maxText',
  },
  textStyleFocused: {
    fontFamily: '$font1',
    color: '$black500',
    fontSize: '$maxText',
  },
  labelTextButton: {
    color: '$primaryBlue',
  },
});
