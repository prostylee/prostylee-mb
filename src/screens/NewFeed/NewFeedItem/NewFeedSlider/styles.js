import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';

export default EStyleSheet.create({
  renderSlide: {
    ...absolute(null, 8, null, 8),
    backgroundColor: '$white',
    paddingHorizontal: 8,
    borderRadius: 24,
    paddingVertical: 6,
  },
});
