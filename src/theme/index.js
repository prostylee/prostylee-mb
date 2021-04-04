import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {Colors} from 'components';

export const lightTheme = {
  isDark: false,
  colors: {
    ...DefaultTheme.colors,
    loading: '#148247',
    ...Colors,
    error: '#f13a59',
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    ...DarkTheme.colors,
    loading: '#fff',
    ...Colors,
    error: '#f13a59',
  },
};
