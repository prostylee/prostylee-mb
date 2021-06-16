import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',
  },
  listWrapper: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  inputContainer: {
    height: 46,
    paddingHorizontal: 16,
  },
  input: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.3,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 100,
  },
});
