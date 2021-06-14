import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from 'utils/ui';
export default EStyleSheet.create({
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    // margin: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F4F5F5',
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFooter: {
    paddingLeft: 13,
  },
  emoji: {
    paddingBottom: isIphoneX() ? 20 : 0,
    height: isIphoneX() ? 290 : 280,
  },
});
