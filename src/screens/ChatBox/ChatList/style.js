import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: 'transparent',
  },
  searchContainer: {
    backgroundColor: '$white',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
  },
  searchBarStyle: {
    width: '100%',
    height: 35,
    alignSelf: 'center',
    marginBottom: 5,
    elevation: 0,
    backgroundColor: '$bgColor',
  },
  searchBarInput: {
    fontSize: 14,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
