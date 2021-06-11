import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 1,
    alignItems: 'center',
  },
  Card: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'normal',
  },
  content: {
    flexDirection: 'column',
    width: '90%',
    paddingHorizontal: 20,
  },
  hintCard: {
    fontSize: 14,
    color: 'grey',
    fontStyle: 'normal',
  },
});
