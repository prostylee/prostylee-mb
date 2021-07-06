import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    paddingHorizontal: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollViewContent: {
    position: 'relative',
  },
  topMessage: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  topMessagetext: {
    color: '$lightGray',
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
  textInputStyle: {
    paddingHorizontal: 0,
    zIndex: -1,
  },
  addressButtonContainer: {
    position: 'relative',
  },
  addressButton: {
    height: 64,
    width: Dimensions.get('window').width - 32,
    zIndex: 10,
    top: 12,
    position: 'absolute',
  },

  wrapContactInfo: {
    backgroundColor: '$white',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  wrapAddressInfo: {
    marginTop: 6,
    backgroundColor: '$white',
    paddingHorizontal: 16,
  },
  pickerContainer: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    bottom: -100,
  },
});
