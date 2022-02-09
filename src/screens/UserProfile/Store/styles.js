import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
  },
  viewFooter: {
    marginBottom: 26,
  },
  listContent: {
    paddingHorizontal: 13,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
