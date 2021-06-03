import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapContent: {
    flex: 1,
  }
});
