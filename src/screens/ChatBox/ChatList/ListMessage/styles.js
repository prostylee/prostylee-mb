import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');
export default EStyleSheet.create({
  listContainer: {
    width: WIDTH,
  },
  listContent: {
    backgroundColor: '$white',
  },
  itemContainer: {
    paddingHorizontal: 16,
  },
  itemStyle: {
    height: 60,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  Card: {
    fontSize: 16,
    color: 'black',
    justifyContent: 'space-between',
  },
  fomat: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'grey',
  },
  img: {
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '$lightGray',
  },
  pad_left_10: {
    paddingLeft: 10,
  },
  itemInfoText: {
    fontSize: 13,
    lineHeight: 18,
    color: '$lightGray',
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 58,
    marginTop: 1,
    marginLeft: 4,
    backgroundColor: '$red',
  },
  newMessageDot: {
    color: '$red',
  },
});
