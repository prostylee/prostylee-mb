import EStyleSheet from 'react-native-extended-stylesheet';

const TABS_HEIGHT = 45;

export default EStyleSheet.create({
  container: {
    marginTop: 0,
  },
  tabBarStyle: {
    backgroundColor: '$white',
  },
  indicatorStyle: {
    backgroundColor: '$purple',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: TABS_HEIGHT,
    flexDirection: 'row',
    paddingTop: 5,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#823FFD',
  },
  viewType: {
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: '$white',
    width: 80,
    bottom: 7,
    position: 'absolute',
    zIndex: 99,
  },
});
