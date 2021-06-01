import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '$black',
  },
  carouselContainer: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  carouselItem: {
    width: 144,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  relatedImage: {
    width: 132,
    height: 176,
    borderRadius: 4,
  },
  relatedName: {
    fontSize: 13,
    lineHeight: 16,
    color: '$black',
    paddingVertical: 8,
    textAlign: 'left',
  },
  relatedInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  relatedPriceGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  relatedPriceSale: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
    fontWeight: 'bold',
  },
  relatedPrice: {
    fontSize: 11,
    lineHeight: 16,
    color: '$lightGray',
  },
  likeButton: {
    width: 20,
    height: 20,
  },
  likeButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
