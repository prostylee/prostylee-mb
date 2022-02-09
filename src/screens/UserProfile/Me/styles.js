import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '$white',
  },
  listContent: {
    paddingHorizontal: 15,
  },
  viewImage: {
    width: (width - 42) / 2,
  },
  separator: {
    height: 12,
  },
  viewFooter: {
    marginBottom: 26,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
