import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const leftWidth = 84;
export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$bgColorTwo',
  },
  wrapContent: {
    flex: 1,
    position: 'relative',
    paddingLeft: leftWidth + 4,
    paddingRight: 4,
    paddingTop: 4,
  },
  wrapLeftContent: {
    flex: 1,
    width: leftWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
  },
  wrapRightContent: {
    flex: 1,
    width: '100%',
    marginBottom: 8,
  },
  wrapRightBanner: {
    width: '100%',
    marginBottom: 8,
  },
  imageBanner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (WIDTH - leftWidth - 8) / 2,
    width: WIDTH - leftWidth - 8,
    borderRadius: 8,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapLabel: {
    paddingRight: 8,
  },
  label: {
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    color: '#333333',
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
