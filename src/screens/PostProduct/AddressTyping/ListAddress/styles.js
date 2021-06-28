import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 1,
    paddingHorizontal: 10,
  },
  Card: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'normal',
    lineHeight: 20,
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
    lineHeight: 20,
  },
});
