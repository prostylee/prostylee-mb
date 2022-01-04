import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: WIDTH,
    height: WIDTH,
  },
  sliderContainer: {
    // borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  sliderItem: {
    width: WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderItemImage: {
    width: WIDTH,
    height: '100%',
  },
  pagingItemStyle: {
    width: 6,
    height: 6,
    marginRight: 0,
  },
  paginationReStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
