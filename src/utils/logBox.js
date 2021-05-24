import {LogBox} from 'react-native';

export const disableLogBox = () => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
};
