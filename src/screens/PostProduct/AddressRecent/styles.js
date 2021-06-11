import {StyleSheet, StatusBar} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  search: {
    width: '80%',
    backgroundColor: '#F4F5F5',
    height: 35,
    marginHorizontal: 15,
    elevation: -5,
  },
  inputStyle: {
    backgroundColor: '#F4F5F5',
    fontSize: 14,
    marginLeft: -20,
  },
});
