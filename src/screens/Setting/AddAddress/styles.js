import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  viewStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  viewDivider: {
    height: 6,
    backgroundColor: '$bgColor',
  },
  viewSwitch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '$white',
  },
  viewSwitchText: {
    flex: 1,
    flexDirection: 'row',
  },
  viewSwitchButton: {
    justifyContent: 'flex-end',
  },
  viewContactInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  viewAddressInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  labelSwitchText: {
    flex: 1,
    flexDirection: 'row',
  },

  wrapContactInfo: {
    backgroundColor: '$white',
    marginTop: 6,
  },
  wrapAddressInfo: {
    marginTop: 6,
    backgroundColor: '$white',
  },
});
