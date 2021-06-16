import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColorSearch',
  },
  wrapContent: {
    flex: 1,
  },
  wrapSearchBar: {
    width: WIDTH - 60,
    backgroundColor: '#F4F5F5',
    height: 35,
    borderRadius: 0,
    elevation: 0,
    padding: 0,
  },
  wrapSearchBarInput: {
    flex: 1,
    height: 35,
    fontSize: 14,
    lineHeight: 18,
    elevation: 0,
  },
});
