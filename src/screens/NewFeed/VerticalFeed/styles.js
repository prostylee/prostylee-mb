import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow, absolute} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    marginVertical: 4,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  alignCenter: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
  textLike: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingRight: 2,
  },
  wrapFollow: {
    ...center,
  },
  socialActionWrap: {
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  postAction: {
    ...flexRow,
    alignItems: 'center',
  },
  touchHeart: {
    paddingRight: 8,
  },
  touchMes: {
    paddingHorizontal: 8,
  },
  description: {
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
    marginHorizontal: 15,
  },
  touchBuyNow: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
    borderColor: '$lightGray',
  },
  touchTextByNow: {
    color: '$lightGray',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    width: WIDTH * 0.75,
  },
  price: {
    color: '$lightGray',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
  },
  textFollow: {
    color: '$purple',
  },
  textFollowed: {
    color: '$lightGray',
  },
  discountPercent: {
    ...absolute(null, 8, 8, null),
    padding: 6,
    borderRadius: 4,
    backgroundColor: '$red',
  },
  textDiscount: {
    color: '$white',
    lineHeight: 18,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
  },
  renderSlide: {
    ...absolute(null, 8, null, 8),
    backgroundColor: '$white',
    paddingHorizontal: 8,
    borderRadius: 24,
    paddingVertical: 6,
  },
  viewFooter: {
    marginBottom: 6,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  isAdvertising: {
    color: '$lightGray',
    fontSize: 11,
    lineHeight: 16,
    marginLeft: 10,
  },
  viewTagStore: {
    ...absolute(null, 8, 8, null),
    ...flexRow,
    ...center,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  textTagName: {
    color: '$white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
    paddingLeft: 8,
  },
});
