import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {getStatusBarHeight} from "react-native-status-bar-height";

export default EStyleSheet.create({
  wrapSearchBar: {
    position: 'absolute',
    bottom: 114,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  wrapButtonLeft: {
    position: 'absolute',
    top: getStatusBarHeight(),
    width: '100%',
    paddingLeft: 16,
  },
  wrapTitle: {
    position: 'absolute',
    bottom: 175,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: '$font1',
    color: '$white',
  },
  imageBanner: {
    width: '100%',
    height: 200,
  },
});
