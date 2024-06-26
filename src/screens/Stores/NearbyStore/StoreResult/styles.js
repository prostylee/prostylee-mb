import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
const WIDTH_IMAGE = 90;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  wrapList: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    paddingBottom: 4,
  },
  item: {
    height: HEIGHT_IMAGE + 52,
    width: WIDTH_IMAGE + 12,
  },
  imageThumbnail: {
    alignItems: 'center',
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    borderWidth: 1,
    borderColor: '#E9EAEB',
    marginRight: 12,
    borderRadius: 4,
  },
  titleProduct: {
    height: 52,
    paddingTop: 6,
    paddingRight: 12,
    fontSize: 11,
    fontWeight: '400',
  },
  text: {
    lineHeight: 65,
  },
  textFollow: {
    color: '$purple',
  },
  textFollowed: {
    color: '$lightGray',
  },
  wrapTextFlow: {
    alignItems: 'center',
    height: 65,
    marginRight: 16,
    justifyContent: 'center',
  },
  viewFooter: {
    marginBottom: 6,
    paddingVertical: 20,
  },
  isAdvertising: {
    color: '$lightGray',
    fontSize: 11,
    lineHeight: 16,
    marginLeft: 4,
  },
  storeName: {
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    color: '$black',
    fontFamily: '$font1',
    fontSize: 14,
  },
});
