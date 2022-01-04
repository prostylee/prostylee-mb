import {Dimensions, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    backgroundColor: '$white',
  },
  wrapHeader: {
    backgroundColor: '$white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapList: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 4,
  },
  wrapItems: {
    // flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    width: WIDTH / 4,
  },
  item: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  imageThumbnail: {
    alignItems: 'center',
    height: 65,
    width: 65,
    borderRadius: 33,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '$black',
    fontFamily: '$font1',
  },
  seeMoreText: {
    fontSize: 13,
    fontWeight: '400',
    color: '$purple',
  },
  titleCategory: {
    width: '100%',
    color: '$black',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 15,
  },
  viewFooter: {
    marginBottom: 6,
  },
});
