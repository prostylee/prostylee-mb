import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 100,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 101,
    backgroundColor: `rgba(25, 25, 25, 0.5)`,
  },
  wrapper: {
    justifyContent: 'center',
    width: width,
    height: height,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentPicker: {
    top: 0,
    backgroundColor: '#ffffff',
    width: width,
    zIndex: 200,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
