import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 112,
    paddingVertical: 12,
    backgroundColor: '$white',
    marginBottom: 8,
  },
  wrapTitle: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    fontFamily: '$font1',
    color: '$black600',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '400',
    color: '$purple',
  },
  wrapList: {
    height: '100%',
  },
  listInner: {
    height: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '$line',
    marginRight: 10,
    padding: 8,
  },
  iconWrapper: {},
  voucherContentWrapper: {
    flex: 7,
    paddingLeft: 16,
  },
  voucherContent: {
    fontSize: 14,
    fontWeight: '500',
    color: '$black',
  },
  expiredDate: {
    fontSize: 14,
    fontWeight: '400',
    color: '$lightGray',
  },
});
