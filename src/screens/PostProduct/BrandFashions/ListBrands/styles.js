import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  Card: {
    fontSize: 14,
    color: 'black',
    fontStyle: 'normal',
    textAlign: 'center',
    paddingTop: 10,
  },
  img: {
    alignItems: 'center',
    width: 88,
    height: 88,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 0.5,
  },
});
