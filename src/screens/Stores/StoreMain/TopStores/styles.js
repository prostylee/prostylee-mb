import EStyleSheet from 'react-native-extended-stylesheet';
import {center, flexRow} from 'theme/style';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
  },
  viewContainer: {
    flex: 1,
    backgroundColor: '$white',
    margin: 8,
    borderRadius: 8,
  },
  titleContainer: {
    paddingTop: 8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 25,
  },
  itemContainer: {
    width: 120,
    alignItems: 'center',
  },
  itemWrapper: {
    borderRadius: 8,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    bottom: -25,
    left: (120 - 50) / 2,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '$black',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    paddingTop: 8,
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
  },
  followBtnContent: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: 0,
  },
  productImageWrap: {
    ...flexRow,
    paddingBottom: 16,
  },
});
