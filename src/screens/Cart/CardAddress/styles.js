import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  wrapAddress: {
    flexDirection: 'column',
    backgroundColor: '$white',
    padding: 10,
    marginBottom: 5,
  },
  wrapAddressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  wrapLabelAddress: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapAddressContent: {width: '50%'},
  labelAddress: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: '#8B9399',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  labelChangeAddress: {
    color: '#823FFD',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
