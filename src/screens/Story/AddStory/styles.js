import {Platform} from 'react-native';
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: Platform.OS === 'android' ? 20 : 32,
  },
  backButtonStyle: {
    width: 28,
    height: 28,
    backgroundColor: '$white',
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottom: {
    position: 'absolute',
    bottom: -15,
    height: 76,
    width: WIDTH,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingHorizontal: 12,
    backgroundColor: '$white',
    zIndex: 100,
  },
  addStore: {
    height: 36,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addStoreText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
  },
  addStory: {
    height: 36,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addStoryButton: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
  addStoryButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$white',
  },
  selectStore: {
    position: 'absolute',
    left: 24,
    bottom: 112,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 30,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  selectStoreName: {
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: 8,
    color: '$white',
  },
  selectStoreRemove: {
    paddingHorizontal: 8,
  },
  selectStoreRemoveText: {
    fontSize: 13,
    lineHeight: 18,
    color: '$red',
  },
});
