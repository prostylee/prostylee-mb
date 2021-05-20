import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = 80;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
export default EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
  },
  wrapHeader: {
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: 'flex-start',
  },
  wrapList: {
    flex: 1,
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    paddingBottom: 4,
    paddingTop: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  imageThumbnail: {
    alignItems: 'center',
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    borderRadius: 4,
    marginLeft: 12
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '$icon',
  },
  wrapDetail: {
    alignItems: 'flex-start',
    height: HEIGHT_IMAGE,
    color: '$black',
    backgroundColor: 'red',
    marginLeft: 12,
    width: WIDTH - WIDTH_IMAGE - 36
  },
  viewFooter: {
    marginBottom: 6,
  },
});
