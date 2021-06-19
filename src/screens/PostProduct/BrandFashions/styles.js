import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');

export default EStyleSheet.create({
  header: {
    borderBottomColor: 'transparent',
  },
  headerContain: {
    paddingBottom: 10,
    borderBottomWidth: 0,
    height: 50,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    backgroundColor: '$white',
    borderBottomColor: '$bgColor',
    height: 40,
    paddingHorizontal: 16,
  },
  searchBarStyle: {
    // width: WIDTH - 32,
    height: 100,
    // alignSelf: 'center',
    // marginBottom: 5,
    // elevation: 0,
    backgroundColor: '$bgColor',
    marginBottom: 6,
  },
  searchBarInput: {
    fontSize: 14,
  },
  button: {
    width: WIDTH - 32,
    alignSelf: 'center',
    paddingBottom: 20,
  },
  notFoundText: {
    fontWeight: '400',
    color: '$gray',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
