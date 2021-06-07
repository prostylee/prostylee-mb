import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    maxHeight: 200,

    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  wrapList: {
    flex: 1,
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    color: '$black',
    lineHeight: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  viewFooter: {
    marginBottom: 6,
  },
  wrapChip: {
    flex: 1,
    paddingHorizontal: 6,
    overflow: 'hidden',
    width: WIDTH,
  },
});
