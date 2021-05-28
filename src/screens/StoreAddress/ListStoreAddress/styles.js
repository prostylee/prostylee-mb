import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  FomatItem: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    marginVertical: 0.5,
    backgroundColor: 'white',
    paddingBottom: 20,
    paddingTop: 20,
  },
  Card: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'space-between',
  },
  fomat: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'grey',
  },
});
