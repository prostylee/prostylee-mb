import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
});
