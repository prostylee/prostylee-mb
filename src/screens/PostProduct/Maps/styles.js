import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cotainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerContain: {
    borderBottomWidth: 0,
    height: 50,
    alignItems: 'center',
  },
  middleComponent: {
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: 'white',
    height: '25%',
  },
  title: {
    fontSize: 14,
    color: 'grey',
  },
  address: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  textFooter: {
    flex: 1,
    padding: 20,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingBottom: 20,
  },
});
