import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 76,
    width: WIDTH,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingHorizontal: 12,
    backgroundColor: '$white',
    zIndex: 100,
    borderTopWidth: 1,
    borderTopColor: '$bgColor',
  },
  likeButton: {
    width: '40rem',
    height: '40rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
