import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingBottom: 6,
  },
  titleContainer: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  itemContainer: {
    padding: 6,
    alignItems: 'center',
  },
  touchImg: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
  },
});
