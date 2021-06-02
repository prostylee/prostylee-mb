import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from '../../utils/ui';
import {dim} from 'utils/common';

const WIDTH = dim.width;
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalStyle: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    paddingBottom: isIphoneX() ? 80 : 49,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH / 3,
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 0,
  },
  labelStyle: {
    fontSize: 13,
    lineHeight: 18,
    color: '$black',
    paddingTop: 12,
  },
});

export default styles;
