import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    width: 700,
    backgroundColor: '#333333',
    height: 700,
    position: 'absolute',
    top: -550,

    borderBottomEndRadius: 300,
    borderBottomStartRadius: 300,
    alignSelf: 'center',
  },
});
