import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    position: 'relative',
  },
  lineHr: {
    height: 1,
    width: WIDTH - 32,
    marginHorizontal: 16,
    backgroundColor: '$bgColor',
  },
  lineHrBig: {
    height: 6,
    width: WIDTH,
    backgroundColor: '$bgColor',
  },
  mainContent: {
    paddingBottom: 76,
  },
  imageList: {
    width: WIDTH,
    height: (WIDTH * 4) / 3,
    // position: 'relative',
  },
  imageItem: {
    width: WIDTH,
    height: (WIDTH * 4) / 3,
  },
  imageCount: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
    height: 22,
    paddingHorizontal: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCountText: {
    fontSize: 11,
    lineHeight: 16,
    color: '$white',
  },
  discount: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '$red',
    borderRadius: 3,
    height: 22,
    paddingHorizontal: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    fontSize: 11,
    lineHeight: 16,
    color: '$white',
  },
});
