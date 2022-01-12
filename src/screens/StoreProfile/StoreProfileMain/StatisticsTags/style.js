import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  paddingLeft4: {
    paddingLeft: 4,
  },
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '$bgColor',
  },
  tagListContainer: {
    backgroundColor: '$white',
    borderRadius: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagItem: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 16,
  },
  ratingValue: {
    ...flexRow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagValue: {
    fontFamily: '$font1',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: '500',
  },
  tagName: {
    fontFamily: '$font1',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 14,
    color: '$black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});
