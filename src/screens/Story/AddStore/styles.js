import EStyleSheet from 'react-native-extended-stylesheet';

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
    left: 16,
  },
  backButtonStyle: {
    width: 36,
    height: 36,
  },
  bottom: {
    height: 76,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingHorizontal: 12,
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
});
