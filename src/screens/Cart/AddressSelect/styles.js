import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  listContainer: {
    flex: 1,
  },
  addressView: {
    flex: 8,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    backgroundColor: '$white',
    position: 'relative',
  },
  addressIconView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  addressDetailView: {
    flex: 4,
    flexDirection: 'column',
  },
  addressDefaultView: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  isDefaultText: {
    color: '$purple',
  },
  subText: {
    color: '$lightGray',
  },
  addAddressButtonView: {
    paddingLeft: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  rightArrowContainer: {
    position: 'absolute',
    right: 16,
  },
  dividerStyle: {
    height: 6,
  },
  newAddressText: {
    paddingLeft: 15,
  },
});
