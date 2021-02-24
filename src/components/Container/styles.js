import EStyleSheet from 'react-native-extended-stylesheet';
import {StatusBar, Platform} from 'react-native';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexGrow: 1,
  },
  safeAreaBottomStyle: {
    backgroundColor: '$white',
  },
});

export default styles;
