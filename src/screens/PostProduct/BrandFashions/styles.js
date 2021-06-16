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
    borderBottomWidth: 1,
    borderBottomColor: '$bgColor',
  },
  searchBarStyle: {
    width: WIDTH - 32,
    height: 35,
    alignSelf: 'center',
    marginBottom: 5,
    elevation: 0,
    backgroundColor: '$bgColor',
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
});
