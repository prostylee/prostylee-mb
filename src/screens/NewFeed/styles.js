import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  header: {
    paddingLeft: 20,
    paddingRight: 12,
  },
  headerLeft: {
    ...flexRow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    paddingHorizontal: 8,
  },
  loading: {
    flex: 1,
  },
});
