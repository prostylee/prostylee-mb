import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  wrapContent: {
    flex: 1,
  },
  rowPrice: {flexDirection: 'row', flex: 1, justifyContent: 'space-between'},
  wrapLabelPrice: {flex: 1},
  labelPrice: {
    color: '#8B9399',
    fontSize: 11,
    lineHeight: 16,
  },
  valuePrice: {
    color: '#333333',
    fontSize: 11,
    lineHeight: 16,
  },
  valueTotal: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
