import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  wrapSection: {
    backgroundColor: '$white',
    alignItems: 'flex-start',
    marginTop: 6,
    flex: 1,
    padding: 10,
  },
  wrapItems: {
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '$white',
    marginBottom: 5,
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapImageThumbnail: {
    position: 'relative',
  },
  wrapTextContent: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapInfo: {
    alignItems: 'flex-start',
  },
  wrapAmount: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapTextSale: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    padding: 4,
    borderRadius: 3,
  },
  wrapUpDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    height: 60,
    width: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  name: {
    lineHeight: 18,
    fontSize: 13,
    fontFamily: '$font1',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    fontWeight: '400',
    justifyContent: 'flex-start',
  },
  price: {
    lineHeight: 18,
    fontSize: 13,
    fontFamily: '$font1',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    fontWeight: '400',
  },
  productColor: {
    borderLeftWidth: 1,
    borderColor: '#E9EAEB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -3,
  },
  textSpace: {
    lineHeight: 25,
    fontSize: 12,
    color: '#F4F5F5',
  },
  wrapPriceRoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
