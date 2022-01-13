import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  labelText: {
    fontFamily: '$font1',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '$black500',
  },
  viewImage: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
  },
  viewCol: {
    marginLeft: 8,
  },
  separator: {
    height: 16,
  },
  viewFooter: {
    marginBottom: 26,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
