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
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '$white',
    marginBottom: 5,
  },
  wrapImageThumbnail: {
    position: 'relative',
  },
  productItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  wrapTextContent: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wrapAmount: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
