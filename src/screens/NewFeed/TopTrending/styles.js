import EStyleSheet from 'react-native-extended-stylesheet';
import {center,flexRow} from 'theme/style'
import {Dimensions} from 'react-native'

const WIDTH = Dimensions.get('window').width

export default EStyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '$white',
    margin: 8,
    borderRadius: 8,
  },
  titleContainer: {
    paddingTop: 8,
  },
  itemContainer: {
    width: WIDTH * 0.7,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 32,
    height: 32,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
  },
  info: {
    ...center
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingTop: 8,
  },
  address: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: '$font1',
    color: '#8B9399',
    paddingLeft: 4,
  },
  addressWrap: {
    ...flexRow,
  }
});
