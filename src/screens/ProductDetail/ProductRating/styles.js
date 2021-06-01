import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    width: WIDTH,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateTitle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  rateTitleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
  },
  ratingTotal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateNumber: {
    fontSize: 11,
    lineHeight: 16,
    color: '$lightGray',
    paddingLeft: 4,
  },
  ratingList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '$bgColor',
  },
  ratingItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  itemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemUserName: {
    fontSize: 14,
    lineHeight: 20,
    color: '$black',
    paddingRight: 8,
  },
  itemContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '$lightGray',
  },
  commentImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  readAllButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '$bgColor',
  },
  readAllButtonText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$purple',
  },
  commentImageStyle: {
    width: 60,
    height: 60,
  },
  commentLastImage: {
    position: 'relative',
  },
  commentImageMore: {
    position: 'absolute',
    top: 0,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  commentImageMoreText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$white',
  },
});
