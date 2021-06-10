import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: -12,
  },
});
