import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  black500: {
    color: '$black500',
  },
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
  markerStyles: {
    backgroundColor: '$black',
    borderWidth: 0,
    width: 20,
    height: 20,
  },
  selectedStyles: {backgroundColor: '$black', height: 5},
  unSelectedStyles: {backgroundColor: '$line', height: 5},
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
