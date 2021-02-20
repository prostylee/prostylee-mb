import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

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
    width: WIDTH * 0.42,
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
    ...center,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingTop: 16,
  },
  address: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: '$font1',
    color: '$lightGray',
    paddingLeft: 4,
  },
  addressWrap: {
    ...flexRow,
  },
  followBtn: {
    height: '28rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4rem',
    backgroundColor: '$purple',
    marginTop: 8,
  },
  followedBtn: {
    backgroundColor: '$disabled',
  },
  followBtnBtnLabel: {
    width: '90%',
    fontFamily: '$font1',
    textAlign: 'center',
    fontWeight: '500',
    color: '$white',
    margin: 0,
  },
  productImageWrap: {
    ...flexRow,
    paddingBottom: 16,
  },
});
