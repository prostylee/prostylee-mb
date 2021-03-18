import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute, flexRow} from 'theme/style';

const {width} = Dimensions.get('window');
const widthCenter = width / 2 - 44;

export default EStyleSheet.create({
  container: {
    ...absolute(null, 34, widthCenter, widthCenter),
    ...flexRow,
    justifyContent: 'center',
    alignItems: 'center',
    width: 88,
    height: 40,
    backgroundColor: '$white',
    borderRadius: 100,
  },
  touch: {
    paddingHorizontal: 4,
  },
});
