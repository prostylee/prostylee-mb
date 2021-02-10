import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import {center,flexRow} from 'theme/style'

const WIDTH = Dimensions.get('window').width - 30
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
    width: WIDTH * 0.7
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
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
    borderColor: '#8B9399'
  },
  touchTextByNow: {
    color: '#8B9399'
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
  },
  price: {
    color: '#8B9399',
    lineHeight: 24,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
  },
  textFollow: {
    color: '$purple',
  },
});
