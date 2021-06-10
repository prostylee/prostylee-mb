import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  wrapper: {
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: -5,
    marginLeft: -20,
  },
  itemPayment: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginVertical: -5,
    marginLeft: -20,
  },
  image: {
    width: 38,
    height: 20,
    paddingLeft: 10,
  },
  img: {
    width: 38,
    height: 38,
  },
  content: {
    fontSize: 16,
  },
  payment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
