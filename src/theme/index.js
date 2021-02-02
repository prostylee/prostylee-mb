import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const lightTheme = {
  isDark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    ...DarkTheme.colors,
  },
};
