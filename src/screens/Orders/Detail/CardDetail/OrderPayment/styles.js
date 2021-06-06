import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapBody: {
    marginTop: 5,
  },
  labelBody: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
  },
});
