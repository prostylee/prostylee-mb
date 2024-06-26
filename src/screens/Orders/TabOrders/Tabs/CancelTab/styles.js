import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  marginLeft10: {
    marginLeft: 10,
  },
  padding16: {
    padding: 16,
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
  wrapFooterItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#F4F5F5',
    paddingTop: 5,
    paddingBottom: 5,
  },
  colCountFooter: {
    flex: 1,
  },
  colButtonFooter: {
    flex: 1,
  },
  colButtonFooterRating: {
    flex: 0.6,
  },
  colButtonFooterRepurchase: {
    flex: 0.4,
  },
  labelCountFooter: {
    color: '#8B9399',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  labelTotalFooter: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  flatList: {
    height: '100%',
  },
  notFoundText: {
    fontSize: 14,
    fontWeight: '400',
    color: '$lightGray',
    alignSelf: 'center',
    marginTop: 20,
  },
});
