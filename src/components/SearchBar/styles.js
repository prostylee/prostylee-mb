import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: 'space-between',
  },
  inputStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: '100%',
    padding: 0,
    fontSize: Platform.OS === 'android' ? 13 : 14,
    lineHeight: 16,
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },

  searchIcon: {
    width: 16,
    height: 16,
  },
  clearIcon: {
    width: 16,
    height: 16,
  },
});
