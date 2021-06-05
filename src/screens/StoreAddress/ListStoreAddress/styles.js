import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: 'column',
    marginVertical: 0.5,
    backgroundColor: '$white',
    paddingBottom: 10,
  },
  fomatItem: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  Card: {
    fontSize: 16,
    color: '$black',
    justifyContent: 'space-between',
  },
  fomat: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '$lightGray',
  },
});
