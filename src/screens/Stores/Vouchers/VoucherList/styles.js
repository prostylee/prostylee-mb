import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$white',
    flexDirection: 'column',
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
  listWrapper: {
    paddingTop: 20,
    backgroundColor: '$bgColorTwo',
    width: '100%',
  },
  itemWrapper: {
    width: '100%',
    flexDirection: 'column',
    minHeight: 140,
    marginBottom: 20,
    padding: 16,
  },
  itemInner: {
    backgroundColor: '$white',
    width: '100%',
    minHeight: 140,
    borderRadius: 8,
    alignItems: 'center',
  },
  topSideWrapper: {
    minHeight: 80,
    width: '100%',
    backgroundColor: '$white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomSideWrapper: {
    position: 'relative',
    height: 60,
    width: '100%',
    backgroundColor: '$white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  leftCutPoint: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -10,
    left: -10,
    borderRadius: 10,
    backgroundColor: '$bgColorTwo',
  },
  rightCutPoint: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -10,
    right: -10,
    borderRadius: 10,
    backgroundColor: '$bgColorTwo',
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
});
