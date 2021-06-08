import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  viewStyle: {
    paddingHorizontal: 16, 
    paddingTop: 16
  },
  viewDivider: {
    height: 6, 
    backgroundColor: "$bgColor"
  },
  viewSwitch: {
    flex: 3, 
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  viewSwitchText: {
    flex: 2, 
    paddingLeft: 16
  },
  viewSwitchButton: {
    flex: 1
  }
});
