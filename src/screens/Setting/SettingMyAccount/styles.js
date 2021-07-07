import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
  },
  contentContainer: {
    flex: 1,
  },
  imageViewButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 9,
    borderRadius: 100,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  imageViewButtonText: {
    color: '$white',
    paddingLeft: 8,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageView: {
    height: WIDTH,
    width: WIDTH,
    backgroundColor: '$bgColor',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDivider: {
    height: 6,
    backgroundColor: '$bgColor',
    width: WIDTH,
    position: 'relative',
    left: -16,
  },
  inputView: {
    paddingHorizontal: 16,
    position: 'relative',
  },
  buttonSave: {
    paddingTop: 8,
    paddingBottom: 34,
  },
  pickerContainer: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    bottom: -100,
  },
  avatar: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
