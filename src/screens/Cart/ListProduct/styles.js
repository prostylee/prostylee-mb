import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
  },

  wrapList: {},
  flatList: {},

  wrapFooter: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    backgroundColor: '$white',
  },
  viewLoadingFooter: {
    marginBottom: 150,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    color: '#333333',
  },
  footerCheckout: {},

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  wrapSection: {
    backgroundColor: '$white',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  wrapHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },
  wrapItems: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    backgroundColor: '$white',
    marginBottom: 5,
    width: '100%',
    height: width / 3.3,
    flex: 1,
  },
  wrapImageThumbnail: {
    position: 'relative',
    height: '100%',
    flex: 10,
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 4,
    borderColor: '#E9EAEB',
  },
  wrapTextContent: {
    flex: 35,
    paddingLeft: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapText: {
    flex: 3,
  },
  wrapAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapSize: {flex: 0.5, flexDirection: 'row'},
  wrapUpdown: {flex: 0.5, alignItems: 'flex-end'},
  storeName: {flex: 1, alignItems: 'center', flexDirection: 'row'},
  storeNameText: {fontSize: 11, lineHeight: 16},
  storeAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    borderRadius: 8,
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
    fontWeight: '500',
    marginTop: 8,
  },
  productAttr: {
    borderLeftWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -3,
    flexDirection: 'row',
    paddingHorizontal: 2,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFooter: {
    marginBottom: 6,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalChangeColor: {
    height: '80%',
    backgroundColor: '$white',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contentBox: {
    flex: 1,
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapButtonEmpty: {
    flex: 1,
  },
  wrapButtonClose: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  wrapMore: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  wrapProductSimilar: {
    backgroundColor: '$white',
    marginBottom: 5,
  },
  wrapProductSuggestion: {
    backgroundColor: '$white',
    marginBottom: 5,
  },
  textMore: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
});
