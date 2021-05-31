import {Dimensions} from 'react-native';
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
  },
  storeNameWrapper: {
    flexDirection: 'column',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fff',
  },
  storeAddressWrapper: {
    flexDirection: 'row',
    marginTop: 2,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '$white',
  },
  storeAddressText: {
    color: '$lightGray',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 5,
  },
  followButton: {
    width: 100,
    backgroundColor: '$purple',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '$white',
  },
});
