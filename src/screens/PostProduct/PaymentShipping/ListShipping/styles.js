import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  itemTitle: {
    fontSize: 14,
    paddingBottom: 3,
    fontWeight: '400',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightTitle: {
    color: '#823FFD',
    fontSize: 14,
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
});
