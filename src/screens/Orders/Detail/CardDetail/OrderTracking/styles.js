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
  wrapTrackingHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapStep: {
    flexDirection: 'column',
  },
  labelStepTitle: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
  },
  labelStepTime: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
  },
  labelTrackingHeader: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
  },
});
