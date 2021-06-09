import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  wrapOrderId: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelOrderId: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
  },
  labelOrderDate: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
  },
  labelOrderStatus: {
    fontSize: 14,
    lineHeight: 20,
  },
});
