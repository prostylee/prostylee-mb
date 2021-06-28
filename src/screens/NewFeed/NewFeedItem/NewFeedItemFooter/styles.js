import EStyleSheet from 'react-native-extended-stylesheet';

import {flexRow} from 'theme/style';

export default EStyleSheet.create({
  actionWrapper: {
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  leftActionWrapper: {
    ...flexRow,
    alignItems: 'center',
  },
});
