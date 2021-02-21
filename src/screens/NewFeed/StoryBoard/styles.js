import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute} from 'theme/style';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingBottom: 6,
  },
  viewContainer: {
    paddingHorizontal: 6,
  },
  titleContainer: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: 'center',
  },
  touchImg: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
    fontFamily: '$font1',
    marginTop: 4,
  },
  circleImg: {
    ...absolute(null, 8, 8, null),
  },
  item: {
    flex: 1,
  },
});
