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
  },
  wrapHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  wrapSize: {flex: 0.5},
  wrapUpdown: {flex: 0.5, alignItems: 'flex-end'},
  storeName: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  storeNameText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: '$font1',
    fontWeight: '500',
    paddingRight: 6,
  },
  storeAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    borderRadius: 11,
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
  },
  buttonCollapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  wrapCollapseHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapCollapseHeaderLabel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleCollapseHeader: {
    color: '$black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  titleCollapseHeaderRequired: {
    color: '$danger',
    fontSize: 10,
    lineHeight: 14,
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
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: '$font1',
  },
  valueTotal: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  valueTotalRed: {
    color: '#EA3F49',
  },
  valueTotalBlue: {
    color: '#2F80ED',
  },
  wrapRadioGroup: {
    flexDirection: 'row',
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapRadioButton: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    backgroundColor: '$white',
  },
  wrapLabelRadioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  wrapRadio: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  wrapRadioTitle: {
    flexDirection: 'column',
  },

  wrapRadioSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  wrapPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    color: '$red',
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
  wrapDeliveryChosen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  wrapInfoChosen: {
    flexDirection: 'column',
    marginRight: 10,
  },
  wrapTitleChosen: {flexDirection: 'column'},
  wrapContentChosen: {
    flexDirection: 'row',
    paddingTop: 4,
  },
  titleChosen: {
    color: '$black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  contentChosen: {
    color: '$lightGray',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: '$font1',
  },
  priceRadioChosen: {
    color: '$red',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  wrapCollapse: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    paddingHorizontal: 16,
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
    justifyContent: 'flex-end',
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
    height: 102,
    width: 77,
    borderRadius: 4,
    borderColor: '#E9EAEB',
  },
  name: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: '$font1',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    fontWeight: '400',
    justifyContent: 'flex-start',
  },
  price: {
    lineHeight: 16,
    fontSize: 12,
    fontFamily: '$font1',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    fontWeight: '400',
    paddingTop: 8,
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
  listInner: {
    paddingBottom: '40rem + 100',
  },
  count: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: '$font1',
    fontWeight: '400',
  },
});
