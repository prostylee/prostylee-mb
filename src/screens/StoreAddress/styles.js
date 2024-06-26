import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from 'utils/ui';
const {width: WIDTH} = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
    position: 'relative',
  },
  headerLeft: {
    height: 30,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 64 + (isIphoneX() ? 24 : 0),
  },
  wrapper: {
    flex: 1,
    marginTop: 6,
  },
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '$white',
  },
  dropDown: {
    marginLeft: 10,
    width: '70%',
    marginRight: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: WIDTH,
    height: 64 + (isIphoneX() ? 24 : 0),
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  button: {
    width: '100%',
  },
  headerContain: {
    paddingBottom: 10,
    height: 50,
    borderBottomWidth: 1,
  },
  middleComponent: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
