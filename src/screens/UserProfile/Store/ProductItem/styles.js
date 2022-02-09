import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = (WIDTH - 36) / 2;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
export default EStyleSheet.create({
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
  },
  item: {
    width: WIDTH_IMAGE,
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  wrapImageThumbnail: {
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
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
  priceInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 4,
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  price: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: '$font1',
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#EA3F49',
    marginTop: 8,
  },
  priceRoot: {
    lineHeight: 20,
    fontSize: 12,
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$purple',
  },
  currencyBlack: {
    color: '$black',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
