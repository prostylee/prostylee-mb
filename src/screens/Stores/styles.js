import {Dimensions} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import {center,flexRow, absolute} from 'theme/style'

const WIDTH = Dimensions.get('window').width - 30
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
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
  isAdvertising: {
    color: '$lightGray',
    fontSize: 11,
    lineHeight: 16,
    marginLeft: 10,
  },
  textFollow: {
    color: '$purple',
  },
  textFollowed: {
    color: '$lightGray'
  },
  productWrap: {
    padding: 6,
  },
  nameProduct: {
    width: 90,
    height: 48,
    fontSize: 11,
    fontFamily: '$font1', 
    lineHeight: 14,
    paddingTop: 8,
  },
  fluidStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
  }
});
