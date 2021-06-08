import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: WIDTH / 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // borderWidth: 1,
  },
  sliderContainer: {
    // borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  sliderItem: {
    width: WIDTH - 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  sliderItemImage: {
    width: WIDTH - 32,
    height: '100%',
    borderRadius: 8,
  },
  paginationReStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
