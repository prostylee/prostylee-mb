import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  isDark: false,
  colors: {
    ...DefaultTheme.colors,
    loading: '#148247',
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    ...DarkTheme.colors,
    loading: '#fff',
  },
};
