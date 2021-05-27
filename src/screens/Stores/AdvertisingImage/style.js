import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    padding: 16,
    marginBottom: 8,
    backgroundColor: '$white',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  advertisingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
