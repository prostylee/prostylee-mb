import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {absolute, center, flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;
export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    marginVertical: 4,
  },
  alignCenter: {
    alignItems: 'center',
  },
  touchMes: {
    paddingHorizontal: 8,
  },
  description: {
    ...flexRow,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E9EAEB',
    marginHorizontal: 15,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    width: WIDTH * 0.75,
  },
  viewFooter: {
    marginBottom: 6,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  viewTagStore: {
    ...absolute(null, 8, 8, null),
    ...flexRow,
    ...center,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  textTagName: {
    color: '$white',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: '$font1',
    paddingLeft: 8,
  },
  postContentWrapper: {
    paddingLeft: 14,
    paddingRight: 14,
    textAlign: 'left',
    lineHeight: 20,
    paddingBottom: 10,
  },
  seeMoreStyle: {
    color: '$lightGray',
  },
  seeLessStyle: {
    color: '$lightGray',
  },
});
