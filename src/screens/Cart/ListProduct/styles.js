import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height} = Dimensions.get('window');

const WIDTH = Dimensions.get('window').width - 100;

export default EStyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '$white',
    alignItems: 'center',
    flexDirection: 'row',
    height: height,
  },

  wrapList: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '$white',
  },
  wrapBody: {
    flex: 0.7,
  },
  flatList: {},
  wrapFooter: {
    flex: 0.3,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 99,
    height: 200,
  },
  viewLoadingFooter: {
    marginTop: 200,
  },
  footerCheckout: {},
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  wrapImageThumbnail: {
    flex: 1,
    position: 'relative',
  },
  wrapTextContent: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
    marginTop: 12,
    fontWeight: '400',
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
  textSpace: {
    lineHeight: 25,
    fontSize: 12,
    color: '#F4F5F5',
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
