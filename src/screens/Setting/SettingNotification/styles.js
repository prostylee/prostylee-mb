import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColor',
  },
  viewStyle: {
    flex: 1,
    marginTop: 6,
    flexDirection: 'row',
    paddingVertical: 7,
    backgroundColor: '$white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
  subText: {
    color: '$lightGray',
  },
  wrapLabel: {
    flex: 1,
    flexDirection: 'column',
  },
  primaryText: {
    paddingRight: 10,
    color: '$black',
    fontSize: 14,
    lineHeight: 20,
  },
  subText: {
    paddingRight: 10,
    color: '$lightGray',
    fontSize: 14,
    lineHeight: 20,
  },
});
