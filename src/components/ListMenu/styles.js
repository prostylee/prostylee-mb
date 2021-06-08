import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '$white',
    marginBottom: 10,
    padding: 10,
  },
  wrapItems: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  wrapInfo: {flex: 1, flexDirection: 'row'},
  labelHeader: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 5,
  },
});
