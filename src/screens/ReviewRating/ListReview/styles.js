import EStyleSheet from 'react-native-extended-stylesheet';
import {flexRow, center} from 'theme/style';
import {Dimensions} from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingBottom: 30,
  },
  leftTouch: {
    paddingLeft: 16,
    fontWeight: '500',
  },
  rightView: {
    ...flexRow,
    paddingRight: 16,
  },
  touchRight: {
    paddingHorizontal: 4,
  },
  mid: {
    ...flexRow,
    ...center,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    fontFamily: '$font1',
    paddingLeft: 10,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: '$font1',
    color: '$white',
  },
  imageBanner: {
    width: '100%',
    height: 200,
  },
  wrapProduct: {
    width: '50%',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  viewTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  viewsubTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    color: '#333333',
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: '#8B9399',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  wrapReviewRating: {
    width: WIDTH,
    padding: 10,
  },
});
