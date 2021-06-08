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
  wrapBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  wrapBodyTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapBodyName: {
    flex: 1,
  },
  labelBodyName: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
  },
  labelBodyPrice: {
    color: '#ED2727',
    fontSize: 14,
    lineHeight: 20,
  },
  labelBodyContent: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
  },
});
