import EStyleSheet from 'react-native-extended-stylesheet';
import {center} from '../../../../theme/style';

export default EStyleSheet.create({
  textButtonWrapper: {
    ...center,
  },
  highlight: {
    color: '$purple',
  },
  unHighlight: {
    color: '$lightGray',
  },
});
