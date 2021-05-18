import EStyleSheet from 'react-native-extended-stylesheet';
import {dim} from 'utils/common';

const WIDTH = dim.width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
  },
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  headerImage: {
    width: 24,
    height: 24,
  },
  headerContainer: {
    height: 44,
    paddingBottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
  cropButton: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cropText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$purple',
  },
  thumbList: {
    height: 100,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 13,
  },
  thumbItemContainer: {
    height: (WIDTH - 26) / 4 - 6,
    width: (WIDTH - 26) / 4,
    paddingHorizontal: 3,
  },
  thumbItem: {
    width: (WIDTH - 26) / 4 - 6,
    height: (WIDTH - 26) / 4 - 6,
    borderRadius: 5,
    borderWidth: 2,
  },
});
