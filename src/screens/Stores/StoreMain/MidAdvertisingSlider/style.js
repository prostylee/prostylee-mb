import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    width: '100%',
    height: WIDTH / 2 + 32,
    marginBottom: 8,
    // borderWidth: 1,
  },
  sliderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
    // borderWidth: 1,
  },
  sliderItem: {
    width: WIDTH - 32,
    height: WIDTH / 2 - 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    // borderWidth: 1,
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
    // borderWidth: 1,
    borderColor: '#fff',
  },
});
