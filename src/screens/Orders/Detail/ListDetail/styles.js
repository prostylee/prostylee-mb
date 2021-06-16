import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$bgColorTwo',
  },
  wrapItem: {
    backgroundColor: '$white',
    padding: 10,
    marginBottom: 10,
  },
  wrapItemFooter: {padding: 10, marginBottom: 10},
  wrapFooterItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#F4F5F5',
    paddingTop: 5,
    paddingBottom: 5,
  },
  colCountFooter: {
    flex: 1,
  },
  colButtonFooter: {
    flex: 1,
  },
  colButtonFooterRating: {
    flex: 0.6,
  },
  colButtonFooterRepurchase: {
    flex: 0.4,
  },
  labelCountFooter: {
    color: '#8B9399',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
  },
  labelTotalFooter: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
