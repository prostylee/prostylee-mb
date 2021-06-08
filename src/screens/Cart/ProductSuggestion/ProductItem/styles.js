import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = WIDTH / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
export default EStyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '$white',
    paddingLeft: 5,
    paddingRight: 5,
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: 16,
    paddingLeft: 3,
    paddingRight: 3,
  },
  wrapImageThumbnail: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
    position: 'relative',
  },
  wrapTextSale: {
    position: 'absolute',
    backgroundColor: '$red',
    bottom: 8,
    left: 8,
    padding: 4,
    borderRadius: 3,
  },
  textSale: {
    fontFamily: '$font1',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 16,
    color: '$white',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  title: {
    width: WIDTH_IMAGE,
    lineHeight: 16,
    fontSize: 13,
    fontFamily: '$font1',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    marginTop: 12,
  },
  price: {
    width: WIDTH_IMAGE,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    marginTop: 8,
  },
  priceRoot: {
    width: WIDTH_IMAGE - 20,
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$icon',
  },
  wrapPriceRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
