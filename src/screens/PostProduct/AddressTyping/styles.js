import {StyleSheet, StatusBar, Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  search: {
    minWidth: WIDTH - 120,
    backgroundColor: '#F4F5F5',
    height: 32,
    borderRadius: 4,
    elevation: 0,
    padding: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    backgroundColor: '#F4F5F5',
    fontSize: 14,
    marginLeft: -20,
  },
  headerGroupButtonRight: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderWidth: 1,
    width: 80,
  },
  indicatorView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
