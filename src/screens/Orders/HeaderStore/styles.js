import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  wrapHeader: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
    justifyContent: 'space-between',
  },
  wrapHeaderInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  wrapHeaderStatus: {
    justifyContent: 'flex-end',
  },
  storeName: {alignItems: 'center', flexDirection: 'row'},
  storeNameText: {fontSize: 11, lineHeight: 16},
  storeAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  textHeaderStatus: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  
});
