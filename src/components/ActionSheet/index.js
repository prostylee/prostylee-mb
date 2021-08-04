import {Platform} from 'react-native';
import _ActionSheetIOS from './IOSActionSheet';
import _ActionSheetCustom from './AndroidActionSheet';
import React from 'react';

export const ActionSheetCustom = _ActionSheetCustom;

const ActionSheet = _ActionSheetCustom;

export default ActionSheet;
