import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  viewStyle: {
    flex: 3, 
    marginTop: 6, 
    flexDirection: 'row',
    paddingVertical: 7, 
    backgroundColor: '$white', 
    alignItems: 'center', 
    justifyContent: 'space-around'
  },
  subText: {
    color: '#8B9399',
    marginLeft: 16
  },
  primaryText: {
    marginLeft: 16
  }
});
