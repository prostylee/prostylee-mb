import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width - 32;
export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    backgroundColor: '#F7F7F7',
  },
  wrapHeader: {
    backgroundColor: '$white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: '#E9EAEB',
    marginRight: 12,
    borderRadius: 8,
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '$black',
  },
  titleCategory: {
    color: '$black',
    width: '50%',
    marginLeft: 12,
    fontWeight: '500',
  },
  viewFooter: {
    marginBottom: 6,
  },
});
