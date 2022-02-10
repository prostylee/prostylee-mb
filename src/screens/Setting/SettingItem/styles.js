import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;

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
    left: 0,
    paddingVertical: 10,
  },
  textLabel: {
    color: '#8B9399',
    paddingBottom: 8,
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    paddingLeft: 16,
  },
  textItemList: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textItemListText: {
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  textItemListIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: WIDTH - 24,
    marginLeft: 12,
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
    height: 36,
    paddingVertical: 0,
  },
  buttonOutlinedRedContent: {
    height: 36,
  },

  labelBtnOutlineRed: {
    color: '$red',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginVertical: 0,
  },
});
