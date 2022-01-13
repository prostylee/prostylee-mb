import {Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'column',
    height: 320,
    paddingVertical: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '500',
    fontFamily: '$font1',
    lineHeight: 20,
    color: '$black600',
    paddingHorizontal: 16,
  },
});
