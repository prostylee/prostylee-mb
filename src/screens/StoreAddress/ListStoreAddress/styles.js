import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: 'column',
    marginVertical: 0.5,
    backgroundColor: '$white',
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fomatItem: {
    flexDirection: 'column',
    paddingTop: 5,
    flex: 1,
  },
  Card: {
    fontSize: 16,
    color: '$black',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    paddingRight: 5,
  },
  textDistance: {
    fontSize: 13,
    color: '$lightGray',
  },
  fomat: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '$lightGray',
  },
});
