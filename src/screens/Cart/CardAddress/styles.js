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
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '$black',
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
  valueAddress: {
    color: '$lightGray',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: '$font1',
  },
  valueAddressEmpty: {
    color: '$red',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: '$font1',
  },
});
