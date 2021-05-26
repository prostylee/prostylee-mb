import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  wrapHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

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
    height: 32,
    marginTop: 8,
    marginRight: 8,
    backgroundColor: '$bgColor',
  },
  priceText: {
    fontSize: 14,
  },
});
