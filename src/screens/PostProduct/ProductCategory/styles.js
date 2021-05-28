import EStyleSheet from 'react-native-extended-stylesheet';
import {dim} from 'utils/common';

const WIDTH = dim.width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    position: 'relative',
  },
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
});
