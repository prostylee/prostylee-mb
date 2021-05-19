import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapBlockOne: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapBlockFilter: {
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  contentBlockOne: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});
