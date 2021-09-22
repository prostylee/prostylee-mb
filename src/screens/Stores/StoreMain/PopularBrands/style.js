import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: 160,
    marginBottom: 8,
  },
  wrapBackground: {
    backgroundColor: 'red',
    flex: 1,
  },
  popularContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingBottom: 8,
  },
  wrapTitle: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '$black',
    fontFamily: '$font1',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '400',
    color: '$purple',
  },
  wrapList: {
    height: '100%',
  },
  listInner: {
    height: '100%',
    paddingHorizontal: 10,
  },

  itemContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 84,
  },
  brandImgContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  brandImg: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 10,
    textAlign: 'center',
  },
});
