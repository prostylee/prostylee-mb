import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '$white',
    marginBottom: 6,
  },
  wrapItems: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F4F5F5',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  wrapInfo: {flex: 1, flexDirection: 'row'},
  labelHeader: {
    color: '#8B9399',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 6,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
