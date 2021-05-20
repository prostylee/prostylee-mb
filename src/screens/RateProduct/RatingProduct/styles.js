import EStyleSheet from 'react-native-extended-stylesheet';


export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapItems: {
    flex: 0,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '$white',
    marginBottom: 5,
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  wrapItemRating: {
    padding: 5,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  wrapItemReview: {
    padding: 5,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 5,
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
  ratingTitle: {
    color: '#8B9399',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
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
  formRate: {flex: 1},
  btnWrapper: {
    marginBottom: '20rem',
    margin: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
