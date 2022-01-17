import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  carouselImgs: {
    flex: 1,
    flexDirection: 'column',
  },
  carouselContainer: {
    paddingHorizontal: 16,
  },
  wrapInfo: {
    flex: 1,
  },
  item: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  imageContainer: {
    // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  image: {
    resizeMode: 'cover',
  },
  wrapName: {
    marginTop: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
  name: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  wrapPrice: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  price: {
    color: '#333333',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  notExist: {
    fontSize: 13,
    lineHeight: 24,
    color: '$red',
    paddingBottom: 2,
  },
  wrapSize: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  wrapColor: {
    padding: 10,
  },
  wrapCheckout: {
    position: 'absolute',
    bottom: 44,
    right: 16,
    left: 16,
  },
  attributeListContainer: {
    // marginBottom: '40rem + 44px',
  },
  attributeListInner: {
    paddingBottom: '40rem + 44px',
  },
});
