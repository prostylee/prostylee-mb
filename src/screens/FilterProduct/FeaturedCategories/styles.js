import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    marginTop: 6,
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
  },
  wrapItems: {
    flexDirection: 'column',
    backgroundColor: '$white',
    paddingBottom: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: WIDTH / 2,
    backgroundColor: '$bgColor',
    borderRadius: 8,
  },
  imageThumbnail: {
    alignItems: 'center',
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: '#E9EAEB',
    marginRight: 12,
  },
  title: {
    color: '$icon',
  },
  titleCategory: {
    color: '$black',
    width: 70,
    marginLeft: 12,
  },
  viewFooter: {
    marginBottom: 6,
  },
});
