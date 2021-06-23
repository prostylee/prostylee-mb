import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const ITEM_HEIGHT = 320;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    minHeight: ITEM_HEIGHT * 2,
  },
  headerGroupButtonRight: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1,
    width: 80,
  },
  wrapBlockOne: {
    height: 45,
    width: '100%',
    paddingTop: 3,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '$white',
  },
  wrapBlockFilter: {
    height: 45,
    width: 105,
    alignItems: 'center',
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentBlockOne: {
    height: 45,
    width: 80,
    alignItems: 'center',
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSort: {
    lineHeight: 18,
    fontSize: 13,
    color: '#8B9399',
    marginLeft: 5,
  },
  textSpace: {
    lineHeight: 25,
    fontSize: 25,
    color: '#F4F5F5',
    marginRight: 10,
  },
  wrapContent: {
    flex: 1,
  },
  wrapList: {
    height: 50,
  },
  wrapChip: {
    width: '100%',
    backgroundColor: '$white',
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  itemChips: {
    height: 32,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '$bgColor',
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    color: '$black600',
    fontFamily: '$font1',
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  viewFooter: {
    width: '100%',
    marginBottom: 50,
  },
});