import EStyleSheet from 'react-native-extended-stylesheet';
import {dim} from 'utils/common';

const WIDTH = dim.width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    position: 'relative',
  },
  safeAreaTopStyle: {
    backgroundColor: '$bgColor',
  },
  mainWrapper: {
    flex: 1,
    position: 'relative',
  },
  mainContent: {
    paddingBottom: 76,
  },
  textInput: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  imageStyle: {
    width: WIDTH,
    height: (WIDTH * 5) / 4,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
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
    left: 10,
    bottom: 10,
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
  imagesList: {
    position: 'relative',
  },
  imagesCount: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  imageCountText: {
    fontSize: 11,
    lineHeight: 16,
    color: '$black',
  },
});
