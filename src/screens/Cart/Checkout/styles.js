import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColorTwo',
  },
  wrapContent: {
    flex: 1,
  },
  wrapList: {},
  flatList: {},

  wrapFooter: {
    flex: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    height: 150,
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
  wrapSection: {
    backgroundColor: '$white',
    alignItems: 'flex-start',
    marginTop: 6,
    padding: 10,
  },
  wrapHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
  },

  wrapSize: {flex: 0.5},
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
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  wrapAccordion: {
    backgroundColor: '$white',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
  },
  buttonCollapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  wrapCollapseHeader: {
    flexDirection: 'row',
  },
  titleCollapseHeader: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  wrapTotal: {
    marginBottom: 5,
    backgroundColor: '$white',
    padding: 10,
  },
  rowTotal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  labelTotal: {
    color: '#8B9399',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
  },
  valueTotal: {
    color: '#333333',
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
  },
  wrapRadioGroup: {
    flexDirection: 'row',
    backgroundColor: '$white',
  },
  wrapRadioButton: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    backgroundColor: '$white',
  },
  wrapRadio: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  wrapRadioTitle: {
    flexDirection: 'column',
  },

  wrapRadioSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconRadioSub: {
    marginLeft: 5,
  },
  titleRadio: {
    color: '#333333',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },
  priceRadio: {
    color: '#ED2727',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },
  contentRadio: {
    color: '#8B9399',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 16,
  },
  wrapLabelDelivery: {
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
