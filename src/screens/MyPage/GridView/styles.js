import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '$bgColor',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  viewImage: {
    width: (width - 42) / 2,
  },
  separator: {
    height: 16,
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
