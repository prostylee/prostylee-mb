import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const {height, width} = Dimensions.get('window');

export default EStyleSheet.create({
  wrapButton: {
    flex: 1,
    flexDirection: 'column',
  },
  rowButton: {
    flex: 1,
    flexDirection: 'row',
  },
  colButton: {
    flex: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonOutlinedGrey: {
    borderColor: '#8B9399',
  },

  labelBtnOutlineGrey: {
    color: '#8B9399',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelBtnOutline: {
    color: '#823FFD',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
});
