import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    paddingHorizontal: 12,
    backgroundColor: '$white',
  },
  viewImage: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
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
