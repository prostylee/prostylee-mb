import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const headerHeight = Platform.OS === 'android' ? 91 : 95;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColorSearch',
  },
  wrapContent: {
    flex: 1,
    position: 'relative',
  },
  wrapSearchBar: {
    width: WIDTH - 30,
    backgroundColor: '#F4F5F5',
    height: 35,
  },
  wrapSearchBarInput: {
    flex: 1,
    height: 35,
    fontSize: 14,
    lineHeight: 18,
    elevation: 0,
  },
  wrapSuggestion: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    height: HEIGHT - headerHeight,
    backgroundColor: '$bgColorSearch',
  },
});
