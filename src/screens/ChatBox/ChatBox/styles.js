import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flex: 1,
  },
  headerContain: {
    paddingBottom: 8,
    backgroundColor: '$purple',
  },
  headerRight: {
    flexDirection: 'row',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    paddingLeft: 30,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftBackIcon: {
    paddingLeft: 16,
    height: '100%',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  name: {
    paddingLeft: 8,
    color: 'white',
  },
  headerRightCallIcon: {
    height: '100%',
    paddingLeft: 16,
    paddingRight: 6,
  },
  headerRightDotIcon: {
    height: '100%',
    paddingLeft: 6,
    paddingRight: 16,
  },
  chatListContainer: {
    flex: 1,
    width: '100%',
  },

  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
  },
  input: {
    height: 40,
    margin: 12,
    borderRadius: 50,
    backgroundColor: '#F4F5F5',
    width: '60%',
  },
  iconFooter: {
    paddingLeft: 13,
  },
});
