import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 8,
  },
  wrapHeader: {
    backgroundColor: '$white',
    padding: 16,
    alignItems: 'flex-start',
  },
  wrapList: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor: '$white',
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    paddingVertical: 3.5,
    height: 67,
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
    fontSize: 14,
    fontWeight: '600',
    color: '$black',
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
