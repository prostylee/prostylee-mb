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
    width: WIDTH / 2,
    height: WIDTH * 0.9,
    marginTop: 16,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 'auto',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  wrapImageThumbnail: {
    // height: HEIGHT_IMAGE,
    flex: 3,
    width: '100%',
    borderRadius: 4,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: HEIGHT_IMAGE,
    width: '100%',
    borderRadius: 4,
  },
  title: {
    // width: '100%',
    // flex: 1,
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
    width: '100%',
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
    // width: WIDTH_IMAGE - 20,
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$icon',
  },
  wrapPriceRoot: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFooter: {
    marginBottom: 6,
  },
  informationWrapper: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
});
