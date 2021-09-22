import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');
export default EStyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    paddingVertical: 16,
    backgroundColor: '$white',
  },
  itemcontainer: {
    width: WIDTH / 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  containerContent: {
    paddingBottom: 40,
  },
  check: {
    backgroundColor: '$purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {paddingTop: 16},
  Card: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'normal',
    textAlign: 'center',
    paddingTop: 10,
  },
  img: {
    alignItems: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    padding: 4,
  },
});
