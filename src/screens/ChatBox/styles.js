import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContain: {
    paddingBottom: 8,
    backgroundColor: '$purple',
  },
  headerRight: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  headerRightIcon: {
    paddingLeft: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30,
    paddingLeft: 30,
  },
  leftHeader: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
