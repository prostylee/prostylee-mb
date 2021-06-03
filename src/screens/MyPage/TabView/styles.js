import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#823FFD'
  }
});
