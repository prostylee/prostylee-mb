import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute, flexRow, center} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...absolute(80, null, 16, null),
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 99,
    width: WIDTH - 32,
  },
  leftHeader: {
    ...flexRow,
    ...center,
    height: 40,
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  name: {
    color: '$white',
    fontFamily: '$font1Bold',
    fontWeight: '500',
    fontSize: '$mediumText',
    paddingHorizontal: 8,
  },
  storyAction: {
    ...absolute(null, 80, null, 16),
    width: 44,
    paddingRight: 8,
    paddingLeft: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  touch: {
    paddingVertical: 12,
    marginLeft: 3,
  },
  line: {
    width: 20,
    height: 1,
    marginLeft: 3,
    backgroundColor: '$lightGray',
  },
});
