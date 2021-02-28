import {StyleSheet, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: WIDTH,
    height: HEIGHT,
  },
  header: {
    ...absolute(8, null, 16, null),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 99,
    width: WIDTH - 32,
  },
});
