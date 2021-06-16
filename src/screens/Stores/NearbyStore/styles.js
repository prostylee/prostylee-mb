import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapContent: {
    flex: 1,
  },
  wrapList: {
    height: 50,
  },
  wrapChip: {
    flexDirection: 'row',
    backgroundColor: '$white',
    paddingLeft: 16,
  },
  itemChips: {
    height: 32,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '$bgColor',
  },
});
