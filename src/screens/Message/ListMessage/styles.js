import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    marginVertical: 0.5,
    backgroundColor: 'white',
  },
  fomatItem: {
    flexDirection: 'column',
    paddingLeft: 10,
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
  img: {
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    paddingRight: 20,
    marginLeft: 10,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    width: 50,
    backgroundColor: '#EA3F49',
    paddingTop: 25,
  },
});
