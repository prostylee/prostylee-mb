import {Platform, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  directionColumn: {flexDirection: 'column'},
  container: {
    marginTop: 8,
  },
  tabUnderLine: {
    backgroundColor: '$purple',
    height: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  titleContainer: {
    paddingHorizontal: 16,
    backgroundColor: '$white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: '$black',
    fontFamily: '$font1',
  },
  listWrapper: {
    paddingTop: 10,
    backgroundColor: '$white',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listLoadingWrapper: {
    flexDirection: 'row',
    paddingBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  itemWrapper: {
    width: '$screenWidth/2',
    height: 300,
    marginBottom: 20,
  },
  itemInner: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 6,
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    position: 'relative',
  },
  infoContainer: {
    flex: 2,
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  toolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    color: '$black',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '$black',
  },
  itemDiscountPrice: {
    fontSize: 13,
    color: '$lightGray',
    fontWeight: '200',
  },
  ratingPoint: {
    fontSize: 11,
    color: '$lightGray',
    marginLeft: 10,
    fontWeight: '300',
  },
  itemBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // minWidth: 50,
    paddingVertical: 5,
    paddingHorizontal: 3,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '$white',
  },
  listFooterContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  notFoundText: {
    fontSize: 14,
    fontWeight: '400',
    color: '$lightGray',
  },

  itemGridWrapper: {
    width: (WIDTH - 24 - 8) / 3,
    height: (((WIDTH - 24 - 8) / 3) * 3) / 2,
    borderRadius: 4,
    marginBottom: 4,
    position: 'relative',
  },
  imageGridStyle: {
    width: (WIDTH - 24 - 8) / 3,
    height: (((WIDTH - 24 - 8) / 3) * 3) / 2,
    borderRadius: 4,
  },
  toolGridContainer: {
    position: 'absolute',
    bottom: 7,
    right: 7,
  },
});
