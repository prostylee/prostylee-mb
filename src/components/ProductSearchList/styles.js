import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '$white',
    flex: 1,
    // paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  itemChips: {
    height: 32,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '$bgColor',
  },
});
