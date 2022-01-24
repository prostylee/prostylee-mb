import EStyleSheet from 'react-native-extended-stylesheet';
export default EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatlistStyle: {
    backgroundColor: '$white',
    width: '100%',
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
  spaceHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 48,
  },
  textSpace: {
    fontSize: 14,
    lineHeight: 20,
    color: '#8B9399',
    fontWeight: '500',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 48,
  },
  categoryIcon: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 24,
    color: '$black',
  },
  notFoundText: {
    fontWeight: '400',
    color: '$gray',
  },
});
