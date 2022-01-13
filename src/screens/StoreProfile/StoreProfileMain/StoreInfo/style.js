import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: Platform.OS === 'android' ? '78rem' : '80rem',
  },
  storeNameWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 12,
    maxWidth: '100%',
  },
  logoContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  storeAddressWrapper: {
    flexDirection: 'row',
    marginTop: 2,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '$black500',
  },
  storeAddressText: {
    color: '$lightGray',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 5,
    maxWidth: '80%',
  },
  followButton: {
    width: 100,
    backgroundColor: '$purple',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '$white',
  },
  infoWrapper: {
    flexDirection: 'row',
    maxWidth: '55%',
  },
});
