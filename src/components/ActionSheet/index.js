import {Platform} from 'react-native';
import _ActionSheetIOS from './IOSActionSheet';
import _ActionSheetCustom from './AndroidActionSheet';

export const ActionSheetCustom = _ActionSheetCustom;

let ActionSheet;

if (Platform.OS === 'ios') {
  ActionSheet = _ActionSheetIOS;
} else {
  ActionSheet = _ActionSheetCustom;
}

export default ActionSheet;
