import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '$bgColor',
  },
  viewImage: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
  },
  viewCol: {
    marginLeft: 8,
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
