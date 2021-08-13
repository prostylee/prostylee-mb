import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import {flexRow} from 'theme/style';

const WIDTH = Dimensions.get('window').width - 30;

export default EStyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerWrap: {
    ...flexRow,
    paddingVertical: 10,
    width: WIDTH * 0.7,
  },
  titleWrapper: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
  subTitleWrapper: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  locationIcon: {
    marginTop: 2,
    width: 3,
    height: 3,
  },
  textSubTitle: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 14,
    color: '$lightGray',
  },
  isAdvertising: {
    color: '$lightGray',
    fontSize: 11,
    lineHeight: 16,
    marginLeft: 10,
  },
});
