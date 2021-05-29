import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');
const WIDTH_IMAGE = width / 2 - 14;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;

export default EStyleSheet.create({
  container: {},
  carouselImgs: {},

  item: {
    width: WIDTH_IMAGE,
    height: HEIGHT_IMAGE,
  },
  imageContainer: {
    flex: 1,
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
    marginTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  name: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
  wrapPrice: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
  },
  price: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  wrapSize: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  wrapColor: {
    padding: 10,
  },
  wrapCheckout: {padding: 10},
});
