import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow, center} from 'theme/style';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.02,
    fontFamily: '$font1Bold',
  },
  header: {
    paddingHorizontal: 10,
  },
  content: {
    paddingTop: 16,
  },
  touchRight: {
    paddingRight: 8,
  },
  mid: {
    ...flexRow,
    ...center,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
});
