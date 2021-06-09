import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  wrapHeader: {
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  title: {
    color: '$icon',
  },
  wrapChip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  itemChips: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    minWidth: 40,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '$white',
    borderColor: '$line',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
