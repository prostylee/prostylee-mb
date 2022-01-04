import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 16,
    backgroundColor: '$white',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '$black',
  },
  listContainer: {
    flexDirection: 'row',
    paddingBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  listWrapper: {
    paddingTop: 20,
    backgroundColor: '$white',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  itemWrapper: {
    width: WIDTH / 2,
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
  itemPriceSale: {
    flexDirection: 'column',
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
  notFoundText: {
    fontSize: 14,
    fontWeight: '400',
    color: '$lightGray',
    alignSelf: 'center',
    marginTop: 20,
  },
});
