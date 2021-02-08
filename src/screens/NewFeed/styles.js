import EStyleSheet from 'react-native-extended-stylesheet';
import {center,flexRow} from 'theme/style'

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
  }
});
