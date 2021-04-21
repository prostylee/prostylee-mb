import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
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
});
