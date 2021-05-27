import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#E82E46',
    height: 220,
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomEndRadius: 300,
  },
});
