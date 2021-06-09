import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '$black',
  },
  listMore: {
    // paddingVertical: 8,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  listMoreText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$purple',
  },
  iconContainer: {
    paddingLeft: 4,
  },
  listContainer: {
    // paddingHorizontal: 8,
    paddingBottom: 20,
  },
  wrapProduct: {
    // borderWidth: 1,
  },
});
