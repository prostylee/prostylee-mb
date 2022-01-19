import EStyleSheet from 'react-native-extended-stylesheet';
import {isIphoneX} from 'utils/ui';
export default EStyleSheet.create({
  footer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 8,
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
    paddingLeft: 8,
  },
  iconFooter: {
    padding: 8,
  },
  emoji: {
    paddingBottom: isIphoneX() ? 20 : 0,
    height: isIphoneX() ? 290 : 280,
  },
});
