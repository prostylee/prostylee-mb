import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const WIDTH = Dimensions.get('window').width;
const WIDTH_IMAGE = 80;
const HEIGHT_IMAGE = WIDTH_IMAGE * 1.5;
export default EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
  },
  wrapHeader: {
    backgroundColor: '$white',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 4,
    alignItems: 'flex-start',
  },
  wrapList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  wrapListInner: {
    flex: 1,
    padding: 0,
    width: WIDTH,
  },
  wrapItems: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    paddingBottom: 4,
    paddingTop: 4,
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  imageThumbnail: {
    alignItems: 'center',
    height: HEIGHT_IMAGE,
    width: WIDTH_IMAGE,
    borderRadius: 4,
    marginLeft: 12,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    width: '100%',
  },
  title: {
    color: '$icon',
    paddingRight: 10,
    maxWidth: '90%',
  },
  wrapImage: {
    position: 'relative',
  },
  wrapDetail: {
    alignItems: 'flex-start',
    height: HEIGHT_IMAGE,
    color: '$black',
    marginLeft: 12,
    width: WIDTH - WIDTH_IMAGE - 36,
  },
  wrapTextSale: {
    position: 'absolute',
    bottom: 8,
    left: 20,
    padding: 4,
    borderRadius: 3,
    backgroundColor: '$red',
  },
  price: {
    width: WIDTH_IMAGE,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: '$font1',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$black',
    marginTop: 8,
  },
  priceRoot: {
    width: WIDTH_IMAGE - 20,
    lineHeight: 16,
    fontSize: 11,
    fontFamily: '$font1',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '$icon',
  },
  textSale: {
    fontFamily: '$font1',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 11,
    lineHeight: 16,
    color: '$white',
  },
  viewFooter: {
    paddingBottom: 26,
    backgroundColor: '$white',
  },
  viewFooterHasResult: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 6,
    alignItems: 'center',
    backgroundColor: '$white',
  },
  wrapRating: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    alignItems: 'center',
  },
  resultRating: {
    lineHeight: 20,
    marginLeft: 5,
    color: '$icon',
  },
});
