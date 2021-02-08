import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {Colors} from 'components';

export const lightTheme = {
  isDark: false,
  colors: {
    ...DefaultTheme.colors,
    loading: '#148247',
    ...Colors,
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    ...DarkTheme.colors,
    loading: '#fff',
    ...Colors,
  },
};
