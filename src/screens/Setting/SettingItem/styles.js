import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  itemContainer: {
    backgroundColor: '$white',
    top: 6,
  },
  textViewLabel: {
    top: 10,
    left: 16,
    paddingVertical: 10,
  },
  textLabel: {
    color: '#8B9399',
  },
  textItemList: {
    left: -16,
  },
  listDividerView: {
    backgroundColor: '$bgColor',
    paddingTop: 6,
  },
  wrapListMenu: {},
  wrapFooterButton: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 32,
    right: 16,
    left: 16,
  },
  buttonOutlinedRed: {
    borderColor: '$red',
  },

  labelBtnOutlineRed: {
    color: '$red',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
