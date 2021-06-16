import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
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
    paddingLeft: 8
  },
  buttonView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  imageView: {
    height: 150,
    backgroundColor: '$bgColor',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDivider: {
    height: 6,
    backgroundColor: '$bgColor'
  },
  buttonSave: {
    paddingTop: 8,
    paddingHorizontal: 16, 
    paddingBottom: 34
  }
});