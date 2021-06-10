import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: -12,
  },
  input: {
    marginTop: -20,
    width: '90%',
    paddingBottom: 5,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
});
