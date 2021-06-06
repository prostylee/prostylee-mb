import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    height: 500,
  },
  wrapUserBody: {
    flexDirection: 'column',
    marginTop: 5,
  },
  labelName: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelInfo: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
