import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeftStyle: {
    padding: 8,
  },
  itemRightStyle: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
});
