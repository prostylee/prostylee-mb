import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (WIDTH - 44) / 2;
export default EStyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  tagListContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagItem: {
    width: ITEM_WIDTH,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '$white',
    borderRadius: 8,
    paddingBottom: 8,
  },
  tagItemImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tagName: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: '$font1Bold',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '$black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 4,
    textAlign: 'center',
  },
  tagNameDes: {
    fontSize: 9,
    lineHeight: 14,
    fontFamily: '$font1',
    color: '$lightGray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    textAlign: 'center',
  },
});
