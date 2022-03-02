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
    paddingBottom: 16,
  },
  colButton: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonOutlinedGrey: {
    borderColor: '#8B9399',
    borderWidth: 1,
  },

  labelBtnOutlineGrey: {
    color: '#8B9399',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  labelBtnOutline: {
    color: '#823FFD',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
});
